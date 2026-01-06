import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, ChevronDown, RotateCw } from 'lucide-react';

interface ControlPanelProps {
  onMoveLeft: () => void;
  onMoveRight: () => void;
  onRotate: () => void;
  onHardDrop: () => void;
  disabled: boolean;
}

const ControlPanel = ({ onMoveLeft, onMoveRight, onRotate, onHardDrop, disabled }: ControlPanelProps) => {
  return (
    <div className="w-full max-w-[320px] px-2">
      <div className="flex items-center justify-between gap-3">
        {/* Left/Right controls */}
        <div className="flex gap-1.5">
          <Button
            variant="secondary"
            size="lg"
            className="h-14 w-14 rounded-xl shadow-md active:scale-95 transition-transform"
            onClick={onMoveLeft}
            disabled={disabled}
          >
            <ChevronLeft className="h-7 w-7" />
          </Button>
          <Button
            variant="secondary"
            size="lg"
            className="h-14 w-14 rounded-xl shadow-md active:scale-95 transition-transform"
            onClick={onMoveRight}
            disabled={disabled}
          >
            <ChevronRight className="h-7 w-7" />
          </Button>
        </div>

        {/* Rotate */}
        <Button
          variant="default"
          size="lg"
          className="h-14 w-14 rounded-xl shadow-md active:scale-95 transition-transform"
          onClick={onRotate}
          disabled={disabled}
        >
          <RotateCw className="h-7 w-7" />
        </Button>

        {/* Hard drop */}
        <Button
          variant="secondary"
          size="lg"
          className="h-14 w-14 rounded-xl shadow-md active:scale-95 transition-transform"
          onClick={onHardDrop}
          disabled={disabled}
        >
          <ChevronDown className="h-7 w-7" />
        </Button>
      </div>
    </div>
  );
};

export default ControlPanel;
