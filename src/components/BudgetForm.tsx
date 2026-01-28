import { useState } from 'react';
import { BudgetFormData, FUNDACAO_OPTIONS, ESTRUTURA_OPTIONS, CONTENCAO_OPTIONS, COMPLEXIDADE_OPTIONS } from '@/types/budget';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { Building2, MapPin, User, Mail, FileText, Ruler, Layers, Mountain, Settings, Eye, Clock } from 'lucide-react';

interface BudgetFormProps {
  formData: BudgetFormData;
  onChange: (data: BudgetFormData) => void;
}

export function BudgetForm({ formData, onChange }: BudgetFormProps) {
  const updateField = <K extends keyof BudgetFormData>(field: K, value: BudgetFormData[K]) => {
    onChange({ ...formData, [field]: value });
  };

  const toggleArrayValue = (field: 'tipoFundacao' | 'tipoEstrutura' | 'tipoContencao', value: string) => {
    const currentArray = formData[field];
    const newArray = currentArray.includes(value)
      ? currentArray.filter(v => v !== value)
      : [...currentArray, value];
    updateField(field, newArray);
  };

  return (
    <div className="space-y-8">
      {/* Identificação da Obra */}
      <section className="engineering-card p-6 animate-slide-in">
        <h3 className="section-title text-foreground mb-6">Identificação da Obra e Cliente</h3>
        
        <div className="grid gap-6 md:grid-cols-2">
          <div className="form-group">
            <Label className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-engineering-orange" />
              Nome da Obra
            </Label>
            <Input
              placeholder="Ex: Ampliação Posto de Combustíveis"
              value={formData.obraName}
              onChange={(e) => updateField('obraName', e.target.value)}
            />
          </div>

          <div className="form-group">
            <Label className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-engineering-orange" />
              Local da Obra
            </Label>
            <Input
              placeholder="Ex: Jataí - GO"
              value={formData.obraLocal}
              onChange={(e) => updateField('obraLocal', e.target.value)}
            />
          </div>

          <div className="form-group">
            <Label className="flex items-center gap-2">
              <User className="h-4 w-4 text-engineering-orange" />
              Nome do Cliente
            </Label>
            <Input
              placeholder="Ex: BIM Brasil"
              value={formData.clienteName}
              onChange={(e) => updateField('clienteName', e.target.value)}
            />
          </div>

          <div className="form-group">
            <Label className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-engineering-orange" />
              E-mail do Cliente
            </Label>
            <Input
              type="email"
              placeholder="Ex: comercial@empresa.com.br"
              value={formData.clienteEmail}
              onChange={(e) => updateField('clienteEmail', e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Escopo do Serviço */}
      <section className="engineering-card p-6 animate-slide-in" style={{ animationDelay: '0.1s' }}>
        <h3 className="section-title text-foreground mb-6">Escopo do Serviço</h3>
        
        <div className="form-group">
          <Label className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-engineering-orange" />
            Descrição do Escopo
          </Label>
          <Textarea
            placeholder="Descreva detalhadamente o escopo do serviço a ser orçado..."
            className="min-h-[120px]"
            value={formData.escopoServico}
            onChange={(e) => updateField('escopoServico', e.target.value)}
          />
        </div>
      </section>

      {/* Dados Técnicos */}
      <section className="engineering-card p-6 animate-slide-in" style={{ animationDelay: '0.2s' }}>
        <h3 className="section-title text-foreground mb-6">Dados Técnicos</h3>
        
        <div className="grid gap-6 md:grid-cols-3">
          <div className="form-group">
            <Label className="flex items-center gap-2">
              <Ruler className="h-4 w-4 text-engineering-orange" />
              Área Construída (m²)
            </Label>
            <Input
              type="number"
              placeholder="Ex: 1500"
              value={formData.areaConstruida || ''}
              onChange={(e) => updateField('areaConstruida', e.target.value ? Number(e.target.value) : null)}
            />
            <p className="text-xs text-muted-foreground mt-1">Para cálculo de superestrutura</p>
          </div>

          <div className="form-group">
            <Label className="flex items-center gap-2">
              <Layers className="h-4 w-4 text-engineering-orange" />
              Nº de Elementos Estruturais
            </Label>
            <Input
              type="number"
              placeholder="Ex: 25"
              value={formData.numElementosEstruturais || ''}
              onChange={(e) => updateField('numElementosEstruturais', e.target.value ? Number(e.target.value) : null)}
            />
            <p className="text-xs text-muted-foreground mt-1">Para cálculo de fundações</p>
          </div>

          <div className="form-group">
            <Label className="flex items-center gap-2">
              <Mountain className="h-4 w-4 text-engineering-orange" />
              Área de Contenção (m²)
            </Label>
            <Input
              type="number"
              placeholder="Ex: 50"
              value={formData.areaContencao || ''}
              onChange={(e) => updateField('areaContencao', e.target.value ? Number(e.target.value) : null)}
            />
            <p className="text-xs text-muted-foreground mt-1">Para cálculo de contenções</p>
          </div>
        </div>
      </section>

      {/* Tipos de Serviço */}
      <section className="engineering-card p-6 animate-slide-in" style={{ animationDelay: '0.3s' }}>
        <h3 className="section-title text-foreground mb-6">Tipos de Serviço</h3>
        
        <div className="space-y-6">
          {/* Fundações */}
          <div>
            <Label className="text-sm font-semibold text-secondary mb-3 block">Tipo(s) de Fundação</Label>
            <div className="grid gap-3 md:grid-cols-2">
              {FUNDACAO_OPTIONS.map((option) => (
                <label
                  key={option.value}
                  className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-accent/50 cursor-pointer transition-all"
                >
                  <Checkbox
                    checked={formData.tipoFundacao.includes(option.value)}
                    onCheckedChange={() => toggleArrayValue('tipoFundacao', option.value)}
                  />
                  <span className="text-sm">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Estruturas */}
          <div>
            <Label className="text-sm font-semibold text-secondary mb-3 block">Tipo(s) de Estrutura</Label>
            <div className="grid gap-3 md:grid-cols-2">
              {ESTRUTURA_OPTIONS.map((option) => (
                <label
                  key={option.value}
                  className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-accent/50 cursor-pointer transition-all"
                >
                  <Checkbox
                    checked={formData.tipoEstrutura.includes(option.value)}
                    onCheckedChange={() => toggleArrayValue('tipoEstrutura', option.value)}
                  />
                  <span className="text-sm">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Contenções */}
          <div>
            <Label className="text-sm font-semibold text-secondary mb-3 block">Tipo(s) de Contenção</Label>
            <div className="grid gap-3 md:grid-cols-2">
              {CONTENCAO_OPTIONS.map((option) => (
                <label
                  key={option.value}
                  className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-accent/50 cursor-pointer transition-all"
                >
                  <Checkbox
                    checked={formData.tipoContencao.includes(option.value)}
                    onCheckedChange={() => toggleArrayValue('tipoContencao', option.value)}
                  />
                  <span className="text-sm">{option.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Configurações */}
      <section className="engineering-card p-6 animate-slide-in" style={{ animationDelay: '0.4s' }}>
        <h3 className="section-title text-foreground mb-6">Configurações do Projeto</h3>
        
        <div className="space-y-6">
          {/* Complexidade */}
          <div>
            <Label className="flex items-center gap-2 mb-3">
              <Settings className="h-4 w-4 text-engineering-orange" />
              Nível de Complexidade
            </Label>
            <RadioGroup
              value={formData.nivelComplexidade}
              onValueChange={(value) => updateField('nivelComplexidade', value as '01' | '02' | '03')}
              className="grid gap-3 md:grid-cols-3"
            >
              {COMPLEXIDADE_OPTIONS.map((option) => (
                <label
                  key={option.value}
                  className="flex items-center gap-3 p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-accent/50 cursor-pointer transition-all"
                >
                  <RadioGroupItem value={option.value} />
                  <div>
                    <span className="text-sm font-medium block">{option.label}</span>
                    <span className="text-xs text-muted-foreground">R$ {option.multiplicador.toLocaleString('pt-BR')}/elemento</span>
                  </div>
                </label>
              ))}
            </RadioGroup>
          </div>

          {/* Switches */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-muted/30">
              <div className="flex items-center gap-3">
                <Layers className="h-5 w-5 text-engineering-orange" />
                <div>
                  <Label className="text-sm font-medium">Pavimentos Tipo</Label>
                  <p className="text-xs text-muted-foreground">Redução de 15% na superestrutura</p>
                </div>
              </div>
              <Switch
                checked={formData.pavimentosTipo}
                onCheckedChange={(checked) => updateField('pavimentosTipo', checked)}
              />
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-muted/30">
              <div className="flex items-center gap-3">
                <Eye className="h-5 w-5 text-engineering-orange" />
                <div>
                  <Label className="text-sm font-medium">Visita Técnica</Label>
                  <p className="text-xs text-muted-foreground">R$ 300,00 por hora</p>
                </div>
              </div>
              <Switch
                checked={formData.visitaTecnica}
                onCheckedChange={(checked) => updateField('visitaTecnica', checked)}
              />
            </div>
          </div>

          {/* Horas de visita */}
          {formData.visitaTecnica && (
            <div className="form-group max-w-xs animate-slide-in">
              <Label className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-engineering-orange" />
                Horas de Visita
              </Label>
              <Input
                type="number"
                placeholder="Ex: 4"
                min="1"
                value={formData.horasVisita || ''}
                onChange={(e) => updateField('horasVisita', Number(e.target.value) || 0)}
              />
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
