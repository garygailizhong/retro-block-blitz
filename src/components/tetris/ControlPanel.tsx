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
    <div className="w-full max-w-[320px] px-4">
      <div className="flex items-center justify-between gap-4">
        {/* Left/Right controls */}
        <div className="flex gap-2">
          <Button
            variant="secondary"
            size="lg"
            className="h-16 w-16 rounded-xl shadow-lg active:scale-95 transition-transform"
            onClick={onMoveLeft}
            disabled={disabled}
          >
            <ChevronLeft className="h-8 w-8" />
          </Button>
          <Button
            variant="secondary"
            size="lg"
            className="h-16 w-16 rounded-xl shadow-lg active:scale-95 transition-transform"
            onClick={onMoveRight}
            disabled={disabled}
          >
            <ChevronRight className="h-8 w-8" />
          </Button>
        </div>

        {/* Rotate */}
        <Button
          variant="default"
          size="lg"
          className="h-16 w-16 rounded-xl shadow-lg active:scale-95 transition-transform"
          onClick={onRotate}
          disabled={disabled}
        >
          <RotateCw className="h-8 w-8" />
        </Button>

        {/* Hard drop */}
        <Button
          variant="secondary"
          size="lg"
          className="h-16 w-16 rounded-xl shadow-lg active:scale-95 transition-transform"
          onClick={onHardDrop}
          disabled={disabled}
        >
          <ChevronDown className="h-8 w-8" />
        </Button>
      </div>
    </div>
  );
};

export default ControlPanel;
