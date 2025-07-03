'use client';

type Agent = {
  id: string;
  name: string;
  title: string;
  experience: string;
  rating: number;
  image: string;
};

type AgentSelectionProps = {
  selectedAgentId: string | null;
  onSelect: (agentId: string | null) => void;
  onBack: () => void;
  onNext: () => void;
};

const mockAgents: Agent[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    title: 'Senior Real Estate Agent',
    experience: '8 years experience',
    rating: 4.9,
    image: '/api/placeholder/100/100'
  },
  {
    id: '2',
    name: 'Michael Chen',
    title: 'Property Specialist',
    experience: '12 years experience',
    rating: 4.8,
    image: '/api/placeholder/100/100'
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    title: 'Luxury Property Expert',
    experience: '15 years experience',
    rating: 5.0,
    image: '/api/placeholder/100/100'
  }
];

export const AgentSelection = ({ selectedAgentId, onSelect, onBack, onNext }: AgentSelectionProps) => {
  return (
    <div className="bg-white p-8">
      <h2 className="text-2xl font-bold mb-6">Choose Your Agent</h2>
      <p className="text-gray-600 mb-6">
        Select an experienced agent to help you list your property, or proceed without an agent.
      </p>
      
      <div className="space-y-4 mb-6">
        {mockAgents.map((agent) => (
          <div
            key={agent.id}
            className={`
              border-2 rounded-lg p-4 cursor-pointer transition-all
              ${selectedAgentId === agent.id
                ? 'border-blue-600 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
              }
            `}
            onClick={() => onSelect(agent.id)}
          >
            <div className="flex items-center">
              <div className="w-16 h-16 bg-gray-200 rounded-full mr-4 flex items-center justify-center">
                <span className="text-xl font-semibold text-gray-600">
                  {agent.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{agent.name}</h3>
                <p className="text-gray-600">{agent.title}</p>
                <p className="text-sm text-gray-500">{agent.experience}</p>
                <div className="flex items-center mt-1">
                  <span className="text-yellow-400">★</span>
                  <span className="ml-1 text-sm font-medium">{agent.rating}</span>
                </div>
              </div>
              {selectedAgentId === agent.id && (
                <div className="text-blue-600">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
          </div>
        ))}
        
        <div
          className={`
            border-2 rounded-lg p-4 cursor-pointer transition-all
            ${selectedAgentId === null
              ? 'border-blue-600 bg-blue-50'
              : 'border-gray-200 hover:border-gray-300'
            }
          `}
          onClick={() => onSelect(null)}
        >
          <div className="flex items-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full mr-4 flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg">No Agent Required</h3>
              <p className="text-gray-600">List your property independently</p>
              <p className="text-sm text-gray-500">Manage your own listing</p>
            </div>
            {selectedAgentId === null && (
              <div className="text-blue-600">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-blue-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
        >
          Back
        </button>
        <button
          onClick={onNext}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
        >
          Continue
        </button>
      </div>
    </div>
  );
};