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

export const mockMessages: Message[] = [
  { id: 'msg1', senderId: 'user2', chatId: 'chat1', content: 'Hey Alice, saw your post in the AI club. Interesting stuff!', timestamp: Date.now() - 2 * 60 * 60 * 1000, senderName: 'Bob The Builder', senderAvatar: mockUserProfiles[1].avatarUrl },
  { id: 'msg2', senderId: 'user1', chatId: 'chat1', content: 'Thanks Bob! Glad you liked it. Are you going to the seminar next week?', timestamp: Date.now() - 1 * 60 * 60 * 1000, senderName: 'Alice Wonderland', senderAvatar: mockUserProfiles[0].avatarUrl },
  { id: 'msg3', senderId: 'user3', chatId: 'chat2', content: 'Diana, that was a great point in the debate club today!', timestamp: Date.now() - 30 * 60 * 1000, senderName: 'Charlie Brown', senderAvatar: mockUserProfiles[2].avatarUrl },
];

export const mockChats: Chat[] = [
  {
    id: 'chat1',
    participants: [
      { id: mockUserProfiles[0].id, name: mockUserProfiles[0].name, avatarUrl: mockUserProfiles[0].avatarUrl },
      { id: mockUserProfiles[1].id, name: mockUserProfiles[1].name, avatarUrl: mockUserProfiles[1].avatarUrl },
    ],
    messages: [mockMessages[0], mockMessages[1]],
    lastMessage: mockMessages[1],
    name: 'Bob The Builder', // In a 1:1 chat, this would be the other person's name
    unreadCount: 1,
  },
  {
    id: 'chat2',
    participants: [
      { id: mockUserProfiles[2].id, name: mockUserProfiles[2].name, avatarUrl: mockUserProfiles[2].avatarUrl },
      { id: mockUserProfiles[3].id, name: mockUserProfiles[3].name, avatarUrl: mockUserProfiles[3].avatarUrl },
    ],
    messages: [mockMessages[2]],
    lastMessage: mockMessages[2],
    name: 'Diana Prince',
    unreadCount: 0,
  },
  {
    id: 'groupChat1',
    participants: [ // In a real app, this would be populated with group members
      { id: mockUserProfiles[0].id, name: mockUserProfiles[0].name, avatarUrl: mockUserProfiles[0].avatarUrl },
      { id: mockUserProfiles[1].id, name: mockUserProfiles[1].name, avatarUrl: mockUserProfiles[1].avatarUrl },
    ],
    messages: [],
    name: 'AI Enthusiasts Club Chat',
    isGroupChat: true,
    unreadCount: 3,
  }
];
