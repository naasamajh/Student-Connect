
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  bio?: string;
  interests: string[];
  skills: string[];
  courses: string[];
  groupMemberships?: string[]; // Names of groups, for AI prompt
}

export interface Group {
  id: string;
  name: string;
  description: string;
  members: UserProfile[];
  memberIds: string[];
  interests: string[];
  imageUrl?: string;
  createdBy: string; // user ID of creator
}

export interface Event {
  id: string;
  name: string;
  date: string; // ISO string
  description: string;
  location: string;
  relatedInterests: string[];
  imageUrl?: string;
  organizer: string; // User or Group name
}

export interface Message {
  id: string;
  senderId: string;
  receiverId?: string; // For direct messages
  chatId?: string; // For group or direct messages
  content: string;
  timestamp: number; // Unix timestamp
  senderName?: string;
  senderAvatar?: string;
}

export interface Chat {
  id: string;
  participants: Pick<UserProfile, 'id' | 'name' | 'avatarUrl'>[];
  messages: Message[];
  lastMessage?: Message;
  name?: string; // For group chats or named chats
  isGroupChat?: boolean;
  unreadCount?: number;
}

export interface ConnectionSuggestion {
  name: string;
  profileOverview: string;
  reason: string;
}
