import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

type HandlerFn = (event: string, data: object) => void;
type HandlerMap = Record<string, HandlerFn>;

interface ISocketConnection {
  pollId: string;
  name: string;
}

export const useSocket = (connectionRequest: ISocketConnection, handlers: HandlerMap, endpoint: string = 'ws://localhost:3000'): Socket | null => {
  const socket = useRef<Socket | null>(null);

  useEffect(() => {
    if (!socket.current) {
      const { pollId, name } = connectionRequest;

      socket.current = io(endpoint, {
        query: {
          name,
          pollId,
        }
      });

      Object.keys(handlers).forEach(event => {
        socket.current?.on(event, handlers[event]);
      });
    }

    return () => {
      socket.current?.disconnect();
    };
  });

  return socket.current;
};
