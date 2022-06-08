import React, { ReactNode } from "react";
import { api } from "../services/api";

interface Transaction {
   id: number;
   title: string;
   amount: number;
   type: string;
   category: string;
   createdAt: string;
}

// Interface para informar os dados que precisa receber para criar uma transação.
// Com o Omit, o transactionInput herda todos os campos do Transaction, menos os campos informados.
// Com o Pick, você seleciona todos os campos que deseja herdar de outra tipagem.
type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>;

// Interface para tipar o children do TransactionsContext.Provider
interface TransactionsProviderProps {
   children: ReactNode;
}

// Interface para informar que o tipo recebe mais de um valor.
// No caso um vetor de transações e uma função chamada createTransaction, que recebe como parâmetro os dados da transação.
interface TransactionsContextData {
   transactions: Transaction[];
   createTransaction: (transaction: TransactionInput) => Promise<void>;
}

const TransactionsContext = React.createContext<TransactionsContextData>(
   {} as TransactionsContextData
);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
   const [transactions, setTransactions] = React.useState<Transaction[]>([]);

   React.useEffect(() => {
      api.get('/transactions')
         .then(response => setTransactions(response.data.transactions));
   }, []);

   async function createTransaction(transactionInput: TransactionInput) {
      const response = await api.post('/transactions', {
         ...transactionInput,
         createdAt: new Date(),
      });
      const { transaction } = response.data;

      // copia todos os dados do array e adiciona o novo.
      setTransactions([...transactions, transaction]);
   }

   return (
      // Passa as transações e a função através de um objeto no value.
      <TransactionsContext.Provider value={{ transactions, createTransaction }}>
         {children}
      </TransactionsContext.Provider>
   );
}

// importação do useContext para dentro do arquivo
export function useTransactions() {
   const context = React.useContext(TransactionsContext);

   return context;
}