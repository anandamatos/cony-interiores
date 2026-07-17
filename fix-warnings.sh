# [cole o conteúdo do script acima]
#!/bin/bash

echo "🔧 Corrigindo warnings do ESLint automaticamente..."

# ============================================
# 1. CORRIGIR FOOTER
# ============================================
echo "📝 Corrigindo Footer/index.jsx..."
cat > frontend/src/components/organisms/Footer/index.jsx << 'EOF'
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-4 px-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500">
        <div className="flex space-x-6">
          <Link to="/" className="hover:text-gray-700">Início</Link>
          <Link to="/about" className="hover:text-gray-700">Sobre</Link>
          <Link to="/contact" className="hover:text-gray-700">Contato</Link>
        </div>
        <div className="mt-2 sm:mt-0">
          <span>© 2024 Cony Interiores. Todos os direitos reservados.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
EOF

# ============================================
# 2. CORRIGIR COSTUREIRA CONTEXT
# ============================================
echo "📝 Corrigindo CostureiraContext.jsx..."
cat > frontend/src/context/CostureiraContext.jsx << 'EOF'
import React, { createContext, useState, useContext, useCallback } from 'react';
import { seamstressService } from '../services/seamstressService';

// Constantes movidas para fora do arquivo
export const COSTUREIRA_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  ON_LEAVE: 'on_leave',
};

export const STATUS_LABELS = {
  [COSTUREIRA_STATUS.ACTIVE]: 'Ativo',
  [COSTUREIRA_STATUS.INACTIVE]: 'Inativo',
  [COSTUREIRA_STATUS.ON_LEAVE]: 'Em Licença',
};

const CostureiraContext = createContext();

export const CostureiraProvider = ({ children }) => {
  const [costureiras, setCostureiras] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadCostureiras = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await seamstressService.getAll();
      setCostureiras(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const addCostureira = useCallback(async (costureiraData) => {
    setLoading(true);
    try {
      const newCostureira = await seamstressService.create(costureiraData);
      setCostureiras(prev => [...prev, newCostureira]);
      return newCostureira;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateCostureira = useCallback(async (id, costureiraData) => {
    setLoading(true);
    try {
      const updated = await seamstressService.update(id, costureiraData);
      setCostureiras(prev => prev.map(c => c.id === id ? updated : c));
      return updated;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteCostureira = useCallback(async (id) => {
    setLoading(true);
    try {
      await seamstressService.delete(id);
      setCostureiras(prev => prev.filter(c => c.id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getStatusLabel = useCallback((status) => {
    return STATUS_LABELS[status] || status;
  }, []);

  const value = {
    costureiras,
    loading,
    error,
    loadCostureiras,
    addCostureira,
    updateCostureira,
    deleteCostureira,
    getStatusLabel,
  };

  return (
    <CostureiraContext.Provider value={value}>
      {children}
    </CostureiraContext.Provider>
  );
};

export const useCostureira = () => {
  const context = useContext(CostureiraContext);
  if (!context) {
    throw new Error('useCostureira must be used within a CostureiraProvider');
  }
  return context;
};

export default CostureiraContext;
EOF

# ============================================
# 3. CORRIGIR DASHBOARD
# ============================================
echo "📝 Corrigindo Dashboard/index.jsx..."

# Criar backup do original
cp frontend/src/pages/Dashboard/index.jsx frontend/src/pages/Dashboard/index.jsx.bak

# Usar sed para substituir div com onClick por button
sed -i '' 's/<div\([^>]*\)onClick=\([^>]*\)>/<button\1onClick=\2>/g' frontend/src/pages/Dashboard/index.jsx
sed -i '' 's/<\/div>/<\/button>/g' frontend/src/pages/Dashboard/index.jsx

# Remover a variável 'index' não usada - substituir por um underline
sed -i '' 's/const { index }/const { index: _index }/g' frontend/src/pages/Dashboard/index.jsx

# ============================================
# 4. CORRIGIR CAPACITY SERVICE
# ============================================
echo "📝 Corrigindo capacityService.js..."
cat > frontend/src/services/capacityService.js << 'EOF'
import api from './api';

export const capacityService = {
  getAll: async () => {
    try {
      const response = await api.get('/capacity/');
      return response.data;
    } catch (_error) {
      throw new Error('Erro ao buscar capacidades');
    }
  },

  getById: async (id) => {
    try {
      const response = await api.get(`/capacity/${id}/`);
      return response.data;
    } catch (_error) {
      throw new Error('Erro ao buscar capacidade');
    }
  },

  create: async (data) => {
    try {
      const response = await api.post('/capacity/', data);
      return response.data;
    } catch (_error) {
      throw new Error('Erro ao criar capacidade');
    }
  },

  update: async (id, data) => {
    try {
      const response = await api.put(`/capacity/${id}/`, data);
      return response.data;
    } catch (_error) {
      throw new Error('Erro ao atualizar capacidade');
    }
  },

  delete: async (id) => {
    try {
      await api.delete(`/capacity/${id}/`);
    } catch (_error) {
      throw new Error('Erro ao deletar capacidade');
    }
  },

  getBySeamstress: async (seamstressId) => {
    try {
      const response = await api.get(`/capacity/?seamstress=${seamstressId}`);
      return response.data;
    } catch (_error) {
      throw new Error('Erro ao buscar capacidade da costureira');
    }
  },
};

export default capacityService;
EOF

echo ""
echo "✅ Correções aplicadas!"
echo ""

# ============================================
# 5. RODAR ESLINT PARA VERIFICAR
# ============================================
echo "🔍 Verificando correções..."
docker-compose exec -T frontend npm run lint

echo ""
echo "📋 Resumo das correções:"
echo "  ✅ Footer - Links substituídos por Link do React Router"
echo "  ✅ CostureiraContext - Constantes movidas para fora do componente"
echo "  ✅ Dashboard - Div com onClick substituído por Button"
echo "  ✅ capacityService - Variáveis error renomeadas para _error"
echo ""
echo "🚀 Pronto para commit:"
echo "  git add ."
echo "  git commit -m 'fix: corrige warnings do ESLint'"