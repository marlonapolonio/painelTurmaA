import { LayoutDashboard } from '../../components/LayoutDashboard';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { verificaTokenExpirado } from '../../services/token';
import { IToken } from '../../interfaces/token';

export default function Voluntarios() {
    const navigate = useNavigate();

    useEffect(() => {
        const lsStorage = localStorage.getItem('americanos.token');
        
        let token: IToken | null = null;

        if (lsStorage) {
            try {
                token = JSON.parse(lsStorage);
            } catch (e) {
                console.error("Erro ao fazer parse do token:", e);
            }
        }

        if (!token || verificaTokenExpirado(token?.accessToken)) {
            navigate('/');
            return;  
        }
    }, [navigate]);

    return (
        <LayoutDashboard>
            <h1>Voluntários</h1>
        </LayoutDashboard>
    );
}