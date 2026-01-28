import { Building2 } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Building2 className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-heading tracking-tight">EngBudget AI</h1>
              <p className="text-sm text-primary-foreground/80">Orçamentos de Engenharia Estrutural</p>
            </div>
          </div>
          <div className="hidden md:block text-right">
            <p className="text-sm text-primary-foreground/80">Sistema inteligente de orçamentação</p>
            <p className="text-xs text-primary-foreground/60">Infraestrutura • Estruturas • Contenções</p>
          </div>
        </div>
      </div>
    </header>
  );
}
