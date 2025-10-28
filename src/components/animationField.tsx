import { Button, Snackbar, TextField } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import { getLocalStorage, optimizeCommands, setLocalStorage } from "@/utils";
import { HistoryTable } from "./historyTable";
import { THistory } from "@/types";
import { Directions } from "./directions";

export const AnimationField = () => {
    const COLS = 10;
    const ROWS = 10;
    const [redBoxPosition, setRedBoxPosition] = useState(0);
    const [commandInput, setCommandInput] = useState("");
    const [speed, setSpeed] = useState(300);
    const [isExecuting, setIsExecuting] = useState(false);
    const [history, setHistory] = useState<THistory[]>(getLocalStorage('history', true) || []);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const commandIndexRef = useRef(0)
    const currentPositionRef = useRef(0)
    const timeoutRef = useRef<NodeJS.Timeout | null>(null)

    useEffect(() => {
        if (!isExecuting) return

        currentPositionRef.current = redBoxPosition
        commandIndexRef.current = 0

        const executeNextCommand = () => {
        if (commandIndexRef.current >= commandInput.length) {
            setIsExecuting(false)
            return
        }

        const command = commandInput[commandIndexRef.current].toUpperCase()
        const row = Math.floor(currentPositionRef.current / COLS)
        const col = currentPositionRef.current % COLS

        let newPosition = currentPositionRef.current

        switch (command) {
            case "Л":
            if (col > 0) newPosition = currentPositionRef.current - 1
            break
            case "П":
            if (col < COLS - 1) newPosition = currentPositionRef.current + 1
            break
            case "Н":
            if (row < ROWS - 1) newPosition = currentPositionRef.current + COLS
            break
            case "В":
            if (row > 0) newPosition = currentPositionRef.current - COLS
            break
        }

        currentPositionRef.current = newPosition
        setRedBoxPosition(newPosition)
        commandIndexRef.current++

        timeoutRef.current = setTimeout(executeNextCommand, speed)
        }

        executeNextCommand()

        return () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }
        }
    }, [isExecuting, commandInput, COLS, ROWS])

    const handleExecute = () => {
        if (commandInput.trim()) {
            setIsExecuting(true);
            const existed = getLocalStorage('history', true) || []
            const updated = [...existed, { original: commandInput, optimized: optimizeCommands(commandInput), datetime: new Date().toLocaleString() } ]
            setHistory(updated);
            setLocalStorage('history', updated, true);
            setIsExecuting(true);
            setTimeout(() => {
                setSnackbarOpen(true);
            }, speed * Number(commandInput.length));
        }
    };

    const handleReset = () => {
        setRedBoxPosition(0)
        setCommandInput("")
        setIsExecuting(false)
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }
    };

    const boxes = Array.from({ length: COLS * ROWS }, (_, i) => i)
    
    return (
        <div className="w-full max-w-2xl mx-auto">
        <div className="mb-6 flex gap-3">
            <TextField
                label="Последовательность команд"
                variant="outlined"
                placeholder="Последовательность команд"
                fullWidth
                value={commandInput}
                onChange={(e) => setCommandInput(e.target.value)}
                disabled={isExecuting}
                style={{ flex: 1 }}
            />
            <TextField
                label="Скорость анимации"
                variant="outlined"
                placeholder="Скорость анимации"
                fullWidth
                type="number"
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
                defaultValue={300}
                disabled={isExecuting}
                style={{ flex: 0.5 }}
            />
        </div>

        <div className="flex gap-3 mb-6">
            <Button 
                type="button" 
                variant="contained" 
                sx={{ mt: 2 }} 
                onClick={handleExecute}
                disabled={isExecuting || !commandInput.trim()}
            >
                Отправлять
            </Button>
            <Button 
                type="button" 
                variant="contained" 
                sx={{ mt: 2 }} 
                onClick={handleReset}
                disabled={isExecuting || !commandInput.trim()}
            >
                Перезагрузить
            </Button>
        </div>

        <Directions/>

        <div
            className="grid gap-1 bg-white p-2 rounded-lg"
            style={{
                gridTemplateColumns: `repeat(${COLS}, 1fr)`,
            }}
        >
            {boxes.map((index) => (
            <div
                key={index}
                className={`w-12 h-12 border-2 transition-colors duration-200 ${
                index === redBoxPosition ? "bg-red-600 border-red-600" : "bg-white border-black"
                }`}
            />
            ))}
        </div>

        <div className="mt-6 text-center text-sm text-muted-foreground">
            Позиция: {redBoxPosition + 1} / {COLS * ROWS}
            {isExecuting && <span className="ml-2 text-blue-600">Выполнение...</span>}
        </div>
            <HistoryTable history={history} />
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
                message="Реализовано"
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            />
        </div>
    )
};
