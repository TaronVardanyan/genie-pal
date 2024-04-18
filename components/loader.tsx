import Image from 'next/image';

const Loader = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-y-4">
      <div className="relative h-14 w-14 animate-bounce">
        <Image fill alt="loading" src="/logo.png" />
      </div>
      <p className="text-sm text-muted-foreground">Genie is thinking...</p>
    </div>
  );
};

export default Loader;
