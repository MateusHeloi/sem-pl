import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, Instagram, Youtube, Send } from "lucide-react";

const Contato = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Ops!",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Mensagem enviada! ",
      description: "Obrigado por entrar em contato. Responderemos em breve!",
    });

    // Reset form
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section id="contato" className="py-20 px-4 bg-gradient-to-b from-background to-primary/5">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Entre em Contato 
          </h2>
          <div className="w-24 h-1 gradient-ocean mx-auto rounded-full mb-4"></div>
          <p className="text-xl text-muted-foreground">
            Tem dúvidas ou quer fazer parte da nossa missão? Fale conosco!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Contact Form */}
          <div className="bg-white rounded-3xl p-8 shadow-ocean animate-fade-in-up">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-foreground mb-2">
                  Nome
                </label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Seu nome completo"
                  className="rounded-xl border-2 border-primary/20 focus:border-primary"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">
                  E-mail
                </label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="seu@email.com"
                  className="rounded-xl border-2 border-primary/20 focus:border-primary"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-foreground mb-2">
                  Mensagem
                </label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Escreva sua mensagem aqui..."
                  rows={5}
                  className="rounded-xl border-2 border-primary/20 focus:border-primary resize-none"
                />
              </div>

              <Button
                type="submit"
                className="w-full gradient-ocean text-white font-bold rounded-full py-6 text-lg hover:scale-105 transition-bounce shadow-ocean"
              >
                <Send className="mr-2" size={20} />
                Enviar mensagem 🌊
              </Button>
            </form>
          </div>

          {/* Social Links & Info */}
          <div className="space-y-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="bg-white rounded-3xl p-8 shadow-ocean">
              <h3 className="text-2xl font-bold text-primary mb-6">Nossas Redes Sociais</h3>
              
              <div className="space-y-4">
                <a 
                  href="https://instagram.com/maresemplastico"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 gradient-coral rounded-2xl hover:scale-105 transition-bounce text-white"
                >
                  <Instagram size={32} />
                  <div>
                    <p className="font-bold">Instagram</p>
                    <p className="text-sm text-white/90">@maresemplastico</p>
                  </div>
                </a>

                <a 
                  href="https://youtube.com/@maresemplastico"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-red-500 rounded-2xl hover:scale-105 transition-bounce text-white"
                >
                  <Youtube size={32} />
                  <div>
                    <p className="font-bold">YouTube</p>
                    <p className="text-sm text-white/90">Maré Sem Plástico</p>
                  </div>
                </a>

                <a 
                  href="mailto:contato@maresemplastico.org"
                  className="flex items-center gap-4 p-4 gradient-ocean rounded-2xl hover:scale-105 transition-bounce text-white"
                >
                  <Mail size={32} />
                  <div>
                    <p className="font-bold">E-mail</p>
                    <p className="text-sm text-white/90">contato@maresemplastico.org</p>
                  </div>
                </a>
              </div>
            </div>

            <div className="bg-secondary/10 border-2 border-secondary rounded-3xl p-6">
              <p className="text-center text-lg font-semibold text-secondary">
                🌊 Junte-se a nós na missão de proteger nossos oceanos!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contato;
