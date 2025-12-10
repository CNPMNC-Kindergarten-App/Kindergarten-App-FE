import { createContext, useContext } from "react";

const TabsContext = createContext();

export function Tabs({ value, onValueChange, children, className }) {
  return (
    <TabsContext.Provider value={{ value, onValueChange }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({ children, className }) {
  return <div className={className}>{children}</div>;
}

export function TabsTrigger({ value, children, className }) {
  const { value: active, onValueChange } = useContext(TabsContext);
  const isActive = active === value;

  return (
    <button
      onClick={() => onValueChange(value)}
      className={`${isActive ? "bg-indigo-600 text-white" : ""} ${className}`}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, children }) {
  const { value: active } = useContext(TabsContext);
  return active === value ? children : null;
}
