'use client';

import Image from 'next/image';

interface EmptyProps {
  label: string;
}

const Empty = ({ label }: EmptyProps) => {
  return (
    <div className="flex h-full flex-col items-center justify-center p-20">
      <div className="relative mb-4 h-72 w-52">
        <Image fill alt="Empty" src="/empty.png" />
      </div>
      <p className="text-center text-sm text-muted-foreground">{label}</p>
    </div>
  );
};

export default Empty;
