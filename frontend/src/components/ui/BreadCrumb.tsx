import { useNavigate } from "react-router";

function BreadCrumb({ title }: { title: string }) {
  const navigate = useNavigate();

  return (
    <header className="bg-white border-b border-gray-100">
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-900 font-syne">{title}</h1>
        <p className="mt-1 text-xs text-gray-400 flex items-center gap-1.5">
          <span
            onClick={() => navigate("/")}
            className="hover:text-purple-900 transition-colors cursor-pointer"
          >
            Home
          </span>
          <span className="text-gray-300">/</span>
          <span className="text-purple-900 font-medium">{title}</span>
        </p>
      </div>
    </header>
  );
}

export default BreadCrumb;
