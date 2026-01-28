import gamaLogo from '@/assets/gama-logo.png';
export function Header() {
  return <header className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img alt="Gama Cálculo Estrutural" className="h-12 w-auto object-contain bg-white rounded-lg px-2 py-1" src="/lovable-uploads/8f2a2089-73cb-4c6f-a486-4af882a94bf5.png" />
            <div>
              <h1 className="text-2xl font-bold font-heading tracking-tight">GAMA2 Cálculo Estrutural</h1>
              <p className="text-sm text-primary-foreground/80">Orçamentos de Engenharia Estrutural</p>
            </div>
          </div>
          <div className="hidden md:block text-right">
            <p className="text-sm text-primary-foreground/80">Sistema inteligente de orçamentação</p>
            <p className="text-xs text-primary-foreground/60">Infraestrutura • Estruturas • Contenções</p>
          </div>
        </div>
      </div>
    </header>;
}