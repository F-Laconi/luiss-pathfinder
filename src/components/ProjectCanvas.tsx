import { useEffect, useRef, useState } from "react";
import { Canvas as FabricCanvas, PencilBrush } from "fabric";
import { Button } from "@/components/ui/button";
import { Eraser, Pen, Trash2 } from "lucide-react";
import canvasFrame from "@/assets/canvas-frame.png";

export const ProjectCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<FabricCanvas | null>(null);
  const [activeTool, setActiveTool] = useState<"draw" | "erase">("draw");

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    // Get container dimensions
    const container = containerRef.current;
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;

    const canvas = new FabricCanvas(canvasRef.current, {
      width: containerWidth,
      height: containerHeight,
      backgroundColor: "#ffffff",
      isDrawingMode: true,
    });

    // Set up drawing brush
    const brush = new PencilBrush(canvas);
    brush.color = "#000000";
    brush.width = 3;
    canvas.freeDrawingBrush = brush;

    setFabricCanvas(canvas);

    // Handle resize
    const handleResize = () => {
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      canvas.setDimensions({ width: newWidth, height: newHeight });
      canvas.renderAll();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      canvas.dispose();
    };
  }, []);

  useEffect(() => {
    if (!fabricCanvas) return;

    if (activeTool === "draw") {
      fabricCanvas.isDrawingMode = true;
      const brush = new PencilBrush(fabricCanvas);
      brush.color = "#000000";
      brush.width = 3;
      fabricCanvas.freeDrawingBrush = brush;
    } else if (activeTool === "erase") {
      fabricCanvas.isDrawingMode = true;
      const brush = new PencilBrush(fabricCanvas);
      brush.color = "#ffffff";
      brush.width = 20;
      fabricCanvas.freeDrawingBrush = brush;
    }
  }, [activeTool, fabricCanvas]);

  const handleClear = () => {
    if (!fabricCanvas) return;
    fabricCanvas.clear();
    fabricCanvas.backgroundColor = "#ffffff";
    fabricCanvas.renderAll();
  };

  return (
    <div className="w-full h-full flex flex-col">
      {/* Toolbar */}
      <div className="flex gap-2 mb-4 justify-center">
        <Button
          variant={activeTool === "draw" ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveTool("draw")}
        >
          <Pen className="w-4 h-4 mr-2" />
          Draw
        </Button>
        <Button
          variant={activeTool === "erase" ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveTool("erase")}
        >
          <Eraser className="w-4 h-4 mr-2" />
          Erase
        </Button>
        <Button variant="outline" size="sm" onClick={handleClear}>
          <Trash2 className="w-4 h-4 mr-2" />
          Clear
        </Button>
      </div>

      {/* Canvas Container */}
      <div 
        ref={containerRef}
        className="relative flex-1 w-full"
        style={{
          backgroundImage: `url(${canvasFrame})`,
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
          padding: "20px",
        }}
      >
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
};
