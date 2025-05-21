
import type { UserProfile, Group, Event, Chat, Message } from './types';

export const mockUserProfiles: UserProfile[] = [
  {
    id: 'user1',
    name: 'Alice Wonderland',
    email: 'alice@example.com',
    avatarUrl: 'https://placehold.co/100x100.png',
    bio: 'Curiouser and curiouser. Computer Science student interested in AI and creative coding.',
    interests: ['Artificial Intelligence', 'Creative Coding', 'Photography', 'Hiking'],
    skills: ['Python', 'JavaScript', 'Machine Learning', 'Adobe Photoshop'],
    courses: ['CS101 - Intro to Programming', 'AI202 - Machine Learning Fundamentals', 'DS303 - Data Visualization'],
    groupMemberships: ['AI Enthusiasts Club', 'Photography Club'],
  },
  {
    id: 'user2',
    name: 'Bob The Builder',
    email: 'bob@example.com',
    avatarUrl: 'https://placehold.co/100x100.png',
    bio: 'Can we build it? Yes, we can! Engineering student passionate about sustainable tech and robotics.',
    interests: ['Robotics', 'Sustainable Technology', 'DIY Projects', 'Gardening'],
    skills: ['CAD Design', 'Embedded Systems', 'Project Management', 'Welding'],
    courses: ['ENG201 - Mechanics', 'ROBO305 - Robot Design', 'SUST401 - Green Engineering'],
    groupMemberships: ['Robotics Club', 'Sustainability Group'],
  },
  {
    id: 'user3',
    name: 'Charlie Brown',
    email: 'charlie@example.com',
    avatarUrl: 'https://placehold.co/100x100.png',
    bio: 'Good grief! Literature major exploring philosophy and creative writing.',
    interests: ['Philosophy', 'Creative Writing', 'Jazz Music', 'Vintage Comics'],
    skills: ['Critical Analysis', 'Storytelling', 'Editing', 'Research'],
    courses: ['LIT101 - World Literature', 'PHIL210 - Ethics', 'WRIT300 - Advanced Composition'],
    groupMemberships: ['Book Club', 'Jazz Appreciation Society'],
  },
  {
    id: 'user4',
    name: 'Diana Prince',
    email: 'diana@example.com',
    avatarUrl: 'https://placehold.co/100x100.png',
    bio: 'Fighting for those who cannot fight for themselves. Political Science student focused on international relations and human rights.',
    interests: ['International Relations', 'Human Rights', 'Debate', 'Volunteering'],
    skills: ['Public Speaking', 'Negotiation', 'Policy Analysis', 'Multilingual (Ancient Greek)'],
    courses: ['POLS202 - Global Politics', 'LAW315 - International Law', 'HIST101 - Ancient Civilizations'],
    groupMemberships: ['Debate Club', 'Amnesty International Chapter'],
  },
];

export const currentUser: UserProfile = mockUserProfiles[0];

export const mockGroups: Group[] = [
  {
    id: 'group1',
    name: 'AI Enthusiasts Club',
    description: 'A place for students passionate about Artificial Intelligence to learn, discuss, and collaborate on projects.',
    members: [mockUserProfiles[0], mockUserProfiles[1]],
    memberIds: [mockUserProfiles[0].id, mockUserProfiles[1].id],
    interests: ['Artificial Intelligence', 'Machine Learning', 'Data Science'],
    imageUrl: 'https://placehold.co/300x200.png',
    createdBy: 'user1',
  },
  {
    id: 'group2',
    name: 'Photography Club',
    description: 'Shutterbugs unite! Share your work, learn new techniques, and go on photo walks.',
    members: [mockUserProfiles[0], mockUserProfiles[2]],
    memberIds: [mockUserProfiles[0].id, mockUserProfiles[2].id],
    interests: ['Photography', 'Visual Arts', 'Photo Editing'],
    imageUrl: 'https://placehold.co/300x200.png',
    createdBy: 'user1',
  },
  {
    id: 'group3',
    name: 'Robotics Club',
    description: 'Design, build, and program robots. Compete in challenges and innovate.',
    members: [mockUserProfiles[1], mockUserProfiles[3]],
    memberIds: [mockUserProfiles[1].id, mockUserProfiles[3].id],
    interests: ['Robotics', 'Engineering', 'Programming'],
    imageUrl: 'https://placehold.co/300x200.png',
    createdBy: 'user2',
  },
];

export const mockEvents: Event[] = [
  {
    id: 'event1',
    name: 'AI Ethics Seminar',
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // One week from now
    description: 'A deep dive into the ethical considerations of emerging AI technologies. Guest speaker: Dr. Elara Vance.',
    location: 'Room 301, Tech Building',
    relatedInterests: ['Artificial Intelligence', 'Ethics', 'Technology'],
    imageUrl: 'https://placehold.co/400x200.png',
    organizer: 'AI Enthusiasts Club',
  },
  {
    id: 'event2',
    name: 'Campus Photo Walk',
    date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(), // Ten days from now
    description: 'Explore the beauty of our campus and capture stunning photos. All skill levels welcome.',
    location: 'Meet at Central Fountain',
    relatedInterests: ['Photography', 'Campus Life', 'Outdoor'],
    imageUrl: 'https://placehold.co/400x200.png',
    organizer: 'Photography Club',
  },
  {
    id: 'event3',
    name: 'Robotics Hackathon Kick-off',
    date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(), // Two weeks from now
    description: 'Join us for the start of our annual robotics hackathon. Form teams, brainstorm ideas, and get ready to build!',
    location: 'Engineering Hall Atrium',
    relatedInterests: ['Robotics', 'Engineering', 'Hackathon'],
    imageUrl: 'https://placehold.co/400x200.png',
    organizer: 'Robotics Club',
  },
];

const baseMessagesUser1ToUser2: Message[] = [
    { id: 'msg1-1', chatId: 'chat_user1_user2', senderId: 'user1', content: 'Hey Bob, how is the new project going?', timestamp: Date.now() - 5 * 60 * 60 * 1000, senderName: mockUserProfiles[0].name, senderAvatar: mockUserProfiles[0].avatarUrl },
    { id: 'msg1-2', chatId: 'chat_user1_user2', senderId: 'user2', content: 'Hi Alice! It\'s challenging but fun. Learned a lot about React Hooks.', timestamp: Date.now() - 4 * 60 * 60 * 1000, senderName: mockUserProfiles[1].name, senderAvatar: mockUserProfiles[1].avatarUrl },
];

const baseMessagesUser3ToUser4: Message[] = [
    { id: 'msg2-1', chatId: 'chat_user3_user4', senderId: 'user3', content: 'Diana, that debate was intense! You were great.', timestamp: Date.now() - 2 * 60 * 60 * 1000, senderName: mockUserProfiles[2].name, senderAvatar: mockUserProfiles[2].avatarUrl },
    { id: 'msg2-2', chatId: 'chat_user3_user4', senderId: 'user4', content: 'Thanks Charlie! It was a good discussion. We should grab coffee and talk more about it.', timestamp: Date.now() - 1 * 60 * 60 * 1000, senderName: mockUserProfiles[3].name, senderAvatar: mockUserProfiles[3].avatarUrl },
];

const group1ChatMessages: Message[] = [
    { id: 'g1msg1', chatId: 'group1', senderId: 'user1', content: 'Welcome to the AI Enthusiasts Club chat!', timestamp: Date.now() - 24 * 60 * 60 * 1000, senderName: mockUserProfiles[0].name, senderAvatar: mockUserProfiles[0].avatarUrl },
    { id: 'g1msg2', chatId: 'group1', senderId: 'user2', content: 'Excited to be here! Any cool projects starting soon?', timestamp: Date.now() - 23 * 60 * 60 * 1000, senderName: mockUserProfiles[1].name, senderAvatar: mockUserProfiles[1].avatarUrl },
];
const group2ChatMessages: Message[] = [
    { id: 'g2msg1', chatId: 'group2', senderId: 'user1', content: 'Anyone up for a photo walk this weekend in the Photography Club?', timestamp: Date.now() - 10 * 60 * 60 * 1000, senderName: mockUserProfiles[0].name, senderAvatar: mockUserProfiles[0].avatarUrl },
];
const group3ChatMessages: Message[] = [
    { id: 'g3msg1', chatId: 'group3', senderId: 'user2', content: 'Robotics Club meeting tonight to discuss the hackathon!', timestamp: Date.now() - 5 * 60 * 60 * 1000, senderName: mockUserProfiles[1].name, senderAvatar: mockUserProfiles[1].avatarUrl },
];


export const mockChats: Chat[] = [
  // 1-on-1 Chats
  {
    id: 'chat_user1_user2', // Consistent ID for user1 & user2 chat
    participants: [
      { id: mockUserProfiles[0].id, name: mockUserProfiles[0].name, avatarUrl: mockUserProfiles[0].avatarUrl },
      { id: mockUserProfiles[1].id, name: mockUserProfiles[1].name, avatarUrl: mockUserProfiles[1].avatarUrl },
    ],
    messages: baseMessagesUser1ToUser2,
    lastMessage: baseMessagesUser1ToUser2[baseMessagesUser1ToUser2.length - 1],
    name: mockUserProfiles[1].name, // Partner's name
    isGroupChat: false,
    unreadCount: 1,
  },
  {
    id: 'chat_user3_user4', // Consistent ID for user3 & user4 chat
    participants: [
      { id: mockUserProfiles[2].id, name: mockUserProfiles[2].name, avatarUrl: mockUserProfiles[2].avatarUrl },
      { id: mockUserProfiles[3].id, name: mockUserProfiles[3].name, avatarUrl: mockUserProfiles[3].avatarUrl },
    ],
    messages: baseMessagesUser3ToUser4,
    lastMessage: baseMessagesUser3ToUser4[baseMessagesUser3ToUser4.length - 1],
    name: mockUserProfiles[3].name, // Partner's name
    isGroupChat: false,
    unreadCount: 0,
  },
  // Group Chats - IDs now match group IDs
  {
    id: 'group1', // Matches mockGroups[0].id
    participants: mockGroups[0].members.map(m => ({ id: m.id, name: m.name, avatarUrl: m.avatarUrl })),
    messages: group1ChatMessages,
    lastMessage: group1ChatMessages.length > 0 ? group1ChatMessages[group1ChatMessages.length -1] : undefined,
    name: mockGroups[0].name,
    isGroupChat: true,
    unreadCount: 2,
  },
  {
    id: 'group2', // Matches mockGroups[1].id
    participants: mockGroups[1].members.map(m => ({ id: m.id, name: m.name, avatarUrl: m.avatarUrl })),
    messages: group2ChatMessages,
    lastMessage: group2ChatMessages.length > 0 ? group2ChatMessages[group2ChatMessages.length -1] : undefined,
    name: mockGroups[1].name,
    isGroupChat: true,
    unreadCount: 1,
  },
  {
    id: 'group3', // Matches mockGroups[2].id
    participants: mockGroups[2].members.map(m => ({ id: m.id, name: m.name, avatarUrl: m.avatarUrl })),
    messages: group3ChatMessages,
    lastMessage: group3ChatMessages.length > 0 ? group3ChatMessages[group3ChatMessages.length -1] : undefined,
    name: mockGroups[2].name,
    isGroupChat: true,
    unreadCount: 0,
  }
];

// Ensure all UserProfile instances in mockChats participants have avatarUrl
mockChats.forEach(chat => {
  chat.participants.forEach(p => {
    if (!p.avatarUrl) {
      const user = mockUserProfiles.find(up => up.id === p.id);
      p.avatarUrl = user?.avatarUrl || `https://placehold.co/100x100.png?text=${p.name?.substring(0,1) || 'U'}`;
    }
  });
  chat.messages.forEach(m => {
     if(!m.senderAvatar) {
        const user = mockUserProfiles.find(up => up.id === m.senderId);
        m.senderAvatar = user?.avatarUrl || `https://placehold.co/100x100.png?text=${m.senderName?.substring(0,1) || 'U'}`;
     }
  });
});
