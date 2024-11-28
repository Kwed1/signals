import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({
   isAllowed,
   redirectPath = '/',
   children,
}: {
   isAllowed: boolean;
   redirectPath?: string;
   children: JSX.Element;
}) {
   if (!isAllowed) {
      return (
         <Navigate
            to={redirectPath}
            replace
         />
      );
   }

   return children;
}
