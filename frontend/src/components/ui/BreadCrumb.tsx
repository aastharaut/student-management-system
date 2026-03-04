function BreadCrumb({ title }: { title: string }) {
  return (
    <header className="bg-slate-50 border-b border-slate-200">
      <div className="container mx-auto px-4 py-8 md:py-10">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
          {title}
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          <span className="hover:text-secondary transition-colors cursor-default">
            Home
          </span>
          <span className="mx-2 text-slate-300">/</span>
          <span className="text-secondary font-medium">{title}</span>
        </p>
      </div>
    </header>
  );
}

export default BreadCrumb;
