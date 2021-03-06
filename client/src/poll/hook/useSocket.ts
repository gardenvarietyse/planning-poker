import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

type HandlerFn = (data: any) => void;
type HandlerMap = Record<string, HandlerFn>;

interface ISocketConnection {
  pollId: string;
  name: string;
}

export const useSocket = (connectionRequest: ISocketConnection, handlers: HandlerMap, endpoint: string): void => {
  const socket = useRef<Socket | null>(null);

  useEffect(() => {
    if (!socket.current) {
      const { pollId, name } = connectionRequest;

      socket.current = io(endpoint, {
        auth: {
          name,
          pollId,
        },
      });

      Object.keys(handlers).forEach(event => {
        socket.current?.on(event, handlers[event]);
      });
    }

    return () => {
      socket.current?.disconnect();
    };
    // don't reconnect on re-render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
