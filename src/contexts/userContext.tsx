"use client"


// src/contexts/UserContext.tsx

import { db } from '@/app/_lib/prisma';
import React, { createContext, useState, ReactNode } from 'react';

// Definindo os tipo

// Criando o contexto com um valor padrão
export const Context = createContext<any>(undefined);

interface ContextProviderProps {
  children: ReactNode;
}

export const ContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
  const [products, setProducts] = useState({
    nome:"joaoa"
  })
  const [suppliers, setSuppliers] = useState({
    empresa:"maria"
  })


  return (
    <Context.Provider value={{ products, setProducts, suppliers, setSuppliers }}>
      {children}
    </Context.Provider>
  );
};
