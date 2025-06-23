// Базовые типы для props и сущностей

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  about?: string;
  position?: string;
}

export interface Manager {
  id: string;
  name: string;
  position: string;
  avatarUrl?: string;
  owner?: string;
  likes?: string[];
}

export interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
}

// Добавляйте сюда типы для других сущностей и props по мере необходимости
