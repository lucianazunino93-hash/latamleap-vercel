import { Copy } from "@/lib/copy";
import { WhatsAppLink } from "@/components/SalesActions";

export default function Purchase() {
  return <section className="mx-auto max-w-3xl px-6 pb-20 pt-12">
    <h1 className="mb-5 text-4xl font-bold"><Copy es="La compra se coordina por WhatsApp." en="Purchases are arranged on WhatsApp." /></h1>
    <p className="mb-6 text-muted-foreground"><Copy es="Escríbenos y te enviamos el enlace de pago." en="Message us and we'll send the payment link." /></p>
    <WhatsAppLink ctaLocation="purchase"><Copy es="Escríbenos por WhatsApp" en="Message us on WhatsApp" /></WhatsAppLink>
  </section>;
}
