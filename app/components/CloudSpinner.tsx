// components/CloudSpinner.tsx
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { formatNumber } from '@/utils/math';

interface CloudSpinnerProps {
  id: string;
  name: string;
  value: number;
  locked?: boolean;
  onNameChange: (newName: string) => void;
  onAddChild: () => void;
}

export const CloudSpinner: React.FC<CloudSpinnerProps> = ({
  id,
  name,
  value,
  locked = false,
  onNameChange,
  onAddChild,
}) => {
  const [editing, setEditing] = useState(false);
  const [tempName, setTempName] = useState(name);

  const handleNameClick = () => {
    if (!locked) setEditing(true);
  };

  const handleBlur = () => {
    setEditing(false);
    onNameChange(tempName.trim() || name);
  };

  return (
    <div className="relative flex flex-col items-center gap-1 p-2">
      <div className="relative flex items-center justify-center bg-blue-200 rounded-full w-20 h-20 shadow-md">
        <span className="text-sm font-medium">
          {formatNumber(value)}
        </span>

        {/* Left ear */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute -top-2 -left-2 w-6 h-6 rounded-full border border-black text-xs leading-none"
          onClick={onAddChild}
        >
          +
        </Button>

        {/* Right ear - hidden or future use */}
        {/* <Button variant="ghost" size="icon" className="absolute -top-2 -right-2 w-6 h-6 rounded-full border border-black text-xs">-</Button> */}
      </div>

      <div className="w-full text-center">
        {editing ? (
          <Input
            value={tempName}
            autoFocus
            onChange={(e) => setTempName(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleBlur();
            }}
            className="text-center text-sm"
          />
        ) : (
          <span
            className={`text-sm font-semibold cursor-pointer ${
              locked ? 'opacity-70' : ''
            }`}
            onClick={handleNameClick}
            title={locked ? 'Top-level node (locked)' : 'Click to edit name'}
          >
            {name}
            {locked && <span className="ml-1 text-xs text-gray-500">🔒</span>}
          </span>
        )}
      </div>
    </div>
  );
};
