import { QueryProvider } from "./providers/query";
import { AppRouter } from "./providers/router";

export const App = () => {
  return (
    <QueryProvider>
      <AppRouter />
    </QueryProvider>
  );
};
