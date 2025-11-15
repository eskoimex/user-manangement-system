import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UsersPage } from "./pages/UsersPage";
import { UserPostsPage } from "./pages/UserPostsPage";
import { User } from "./types";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
  };

  const handleBackToUsers = () => {
    setSelectedUser(null);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        {selectedUser ? (
          <UserPostsPage user={selectedUser} onBack={handleBackToUsers} />
        ) : (
          <UsersPage onUserSelect={handleUserSelect} />
        )}
      </div>
    </QueryClientProvider>
  );
}

export default App;
