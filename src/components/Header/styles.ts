import styled from 'styled-components';

export const Container = styled.header`
   background: var(--blue);
`;

export const Content = styled.div`
   display: flex;
   justify-content: space-between;
   align-items: center;
   max-width: 1120px;
   margin: 0 auto;
   padding: 2rem 1rem 12rem;

   button {
      font-size: 1rem;
      color: #fff;
      height: 3rem;
      background-color: var(--blue-light);
      padding: 0 2rem;
      border: 0;
      border-radius: 0.25rem;
      transition: filter 0.2s;

      &:hover {
         filter: brightness(0.9);
      }
   }
`