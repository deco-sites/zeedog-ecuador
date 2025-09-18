import { AppContext } from "site/apps/site.ts";

interface BackToHomeProps {
  text: string;
  href: string;
}

interface Props {
  title: string;
  description: string;
  backToHome: BackToHomeProps;
}

export default function ErrorPage({ title, description, backToHome }: Props) {
  if (!title) return null;

  return (
    <div className="flex flex-col items-center justify-center h-[50dvh] p-4 text-center">
      <h1 className="text-4xl font-bold">{title}</h1>
      <p className="mt-4 text-lg">{description}</p>
      <a
        href={backToHome.href}
        className="mt-6 text-blue-400 hover:underline"
      >
        {backToHome.text}
      </a>
    </div>
  );
}

export const loader = (props: Props, req: Request, ctx: AppContext) => {
  const url = new URL(req.url);

  const availablePaths = [
    "/pages/sobre-nosotros",
    "/pages/preguntas-frecuentes",
    "/policies/politica-de-privacidad",
    "/policies/informacion-de-contacto",
    "/policies/politica-de-reembolso",
    "/policies/politica-de-envio",
    "/policies/terminos-y-condiciones-del-servicio",
  ];

  if (availablePaths.some((path) => path === url.pathname)) return null;

  ctx.response.status = 404;
  return props;
};
