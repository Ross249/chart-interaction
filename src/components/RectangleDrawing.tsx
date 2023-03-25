import { producer } from "@/lib/dataProducer";
import { IState } from "@/types/data";
import React, { useState, useRef, useEffect, CSSProperties } from "react";
import { Position, Rnd } from "react-rnd";

export default function RectangleDrawing() {
  const [state, setState] = useState<IState>({
    position: { x: 0, y: 0 },
    size: { width: 0, height: 0 },
  });
  const isDragging = useRef<boolean>(false);
  const isRect = useRef<boolean>(false);

  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent> | MouseEvent
  ) => {
    if (!isRect) {
      isDragging.current = true;
      setState({
        ...state,
        position: {
          x: event.clientX,
          y: event.clientY,
        },
      });
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    isRect.current = true;
  };

  const handleMouseMove = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (isDragging.current) {
      setState({
        ...state,
        position: {
          x: state.position.x + event.movementX,
          y: state.position.y + event.movementY,
        },
      });
    }
  };

  const handleResizeStop = (
    event: MouseEvent | TouchEvent,
    direction: any,
    ref: HTMLDivElement,
    delta: any,
    position: Position
  ) => {
    setState({
      ...state,
      size: {
        width: ref.style.width,
        height: ref.style.height,
      },
    });
  };

  // init
  const [first, setFirst] = useState({ x: 0, y: 0 });
  const [second, setSecond] = useState({ x: 0, y: 0 });
  const initDrag = useRef<boolean>(false);
  const initRect = useRef<boolean>(false);
  const initDown = (event: MouseEvent) => {
    if (!initRect.current) {
      setFirst({ x: event.clientX, y: event.clientY });
      initDrag.current = true;
    }
  };
  const initMove = (event: MouseEvent) => {
    if (!initRect.current && first.x !== 0) {
      setSecond({ x: event.clientX, y: event.clientY });
    }
  };
  const initUp = (event: MouseEvent) => {
    if (!initRect.current && event.button !== 2) {
      setSecond({ x: event.clientX, y: event.clientY });
      initDrag.current = false;
      initRect.current = true;
    }
  };

  useEffect(() => {
    window.addEventListener("mousedown", initDown);
    window.addEventListener("mousemove", initMove);
    window.addEventListener("mouseup", initUp);

    return () => {
      window.removeEventListener("mousedown", initDown);
      window.removeEventListener("mousemove", initMove);
      window.removeEventListener("mouseup", initUp);
    };
  }, []);

  useEffect(() => {
    setState({
      position: {
        x: Math.min(first.x, second.x),
        y: Math.min(first.y, second.y),
      },
      size: {
        width: Math.max(first.x, second.x) - Math.min(first.x, second.x),
        height: Math.max(first.y, second.y) - Math.min(first.y, second.y),
      },
    });
  }, [second]);

  const handleContextMenu = (e: any) => {
    e.preventDefault();
    setFirst({ x: 0, y: 0 });
    setSecond({ x: 0, y: 0 });
    initRect.current = false;
  };

  useEffect(() => {
    console.log(producer(2, 10, 10, 10000));
  }, []);

  return (
    <div className="relative h-full">
      {initRect.current && second.x !== 0 && (
        <Rnd
          className="flex rounded-lg border  items-center justify-center bg-black/10 border-dashed border-black z-10"
          style={{
            display: "flex",
            top: state.position.y,
            left: state.position.x,
          }}
          size={state.size}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onResizeStop={handleResizeStop as any}
          onDragStop={(e, d) => {
            console.log(d);
            console.log(state.position);
          }}
          onContextMenu={(e: any) => handleContextMenu(e)}
        ></Rnd>
      )}
    </div>
  );
}
