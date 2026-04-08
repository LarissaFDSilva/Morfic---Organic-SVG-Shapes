import React from 'react';
import { Database, ShieldCheck, Cloud, Globe, BarChart3, Settings } from 'lucide-react';

interface FirebaseFeature {
  name: string;
  offer: string;
  tip: string;
  icon: React.ReactNode;
}

const features: FirebaseFeature[] = [
  {
    name: 'Authentication',
    offer: 'Até 50k usuários ativos/mês',
    tip: 'Crie um sistema de login para que o usuário salve suas preferências.',
    icon: <ShieldCheck className="w-5 h-5" />
  },
  {
    name: 'Cloud Firestore',
    offer: '1GB total / 50k leituras dia',
    tip: 'Salve o histórico de ações do usuário ou configurações personalizadas.',
    icon: <Database className="w-5 h-5" />
  },
  {
    name: 'Cloud Storage',
    offer: '5GB de armazenamento',
    tip: 'Se sua ferramenta lida com arquivos, permita o upload e armazenamento seguro.',
    icon: <Cloud className="w-5 h-5" />
  },
  {
    name: 'Hosting',
    offer: '10GB de transferência/mês',
    tip: 'Publique sua ferramenta com domínio HTTPS gratuito para portfólio.',
    icon: <Globe className="w-5 h-5" />
  },
  {
    name: 'Analytics',
    offer: 'Ilimitado',
    tip: 'Monitore quais dos seus novos recursos estão sendo mais clicados.',
    icon: <BarChart3 className="w-5 h-5" />
  },
  {
    name: 'Remote Config',
    offer: 'Ilimitado',
    tip: 'Altere cores ou mensagens do app em tempo real sem precisar mexer no código.',
    icon: <Settings className="w-5 h-5" />
  }
];

export const FirebaseToolbox: React.FC = () => {
  return (
    <section className="bg-white rounded-3xl p-8 shadow-lg border border-black/5 overflow-hidden">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center">
          <Database className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">2. Toolbox: Integração com Firebase (Plano Spark)</h2>
          <p className="text-sm text-gray-500">Para tornar sua ferramenta robusta e escalável sem custos, utilize os seguintes recursos do Firebase. Abaixo, listamos como integrá-los de forma estratégica:</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="py-4 px-4 font-bold text-gray-900 text-sm italic serif">Recurso Firebase</th>
              <th className="py-4 px-4 font-bold text-gray-900 text-sm italic serif">O que oferece (Grátis)</th>
              <th className="py-4 px-4 font-bold text-gray-900 text-sm italic serif">Dica de Uso no seu Projeto</th>
            </tr>
          </thead>
          <tbody>
            {features.map((feature, index) => (
              <tr 
                key={index} 
                className="group hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0"
              >
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <div className="text-accent opacity-70 group-hover:opacity-100 transition-opacity">
                      {feature.icon}
                    </div>
                    <span className="font-bold text-gray-800">{feature.name}</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-gray-600 text-sm font-mono">
                  {feature.offer}
                </td>
                <td className="py-4 px-4 text-gray-600 text-sm leading-relaxed">
                  {feature.tip}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
