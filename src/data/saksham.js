
export const posts = [
  {
    id: 'sa1',
    user: { name: 'Ravi Kumar', handle: '@ravikumar', avatar: 'RK', badge: 'Java Guru', karma: 5120 },
    content: 'Elegant way to handle Optional chaining in Java. No more NullPointerExceptions! 💪',
    code: `public Optional<String> getUserEmail(Long userId) {
    return userRepository.findById(userId)
        .map(User::getProfile)
        .map(Profile::getContactInfo)
        .map(ContactInfo::getEmail)
        .filter(email -> !email.isBlank());
}

// Clean, safe, no null checks needed!`,
    language: 'java',
    refactors: 15,
    comments: 31,
    runs: 178,
    time: '1h ago',
    liked: false,
    bookmarked: false,
    upvotes: 112
  },
  {
    id: 'sa2',
    user: { name: 'Meera Singh', handle: '@meerasingh', avatar: 'MS', badge: 'SQL Wizard', karma: 3450 },
    content: 'Window functions are underrated. Here\'s a rank query that saved me hours 📊',
    code: `SELECT 
    employee_name,
    department,
    salary,
    RANK() OVER (
        PARTITION BY department 
        ORDER BY salary DESC
    ) as salary_rank
FROM employees
WHERE salary_rank <= 3;

-- Top 3 earners per department, clean & fast`,
    language: 'java',
    refactors: 7,
    comments: 19,
    runs: 95,
    time: '3h ago',
    liked: true,
    bookmarked: true,
    upvotes: 87
  },
  {
    id: 'sa3',
    user: { name: 'Ankit Joshi', handle: '@ankitjoshi', avatar: 'AJ', badge: 'DevOps Pro', karma: 4210 },
    content: 'Spring Boot + Redis caching in 10 lines. Your API will thank you 🚀',
    code: `@Service
public class ProductService {
    
    @Cacheable(value = "products", key = "#id")
    public Product getProduct(Long id) {
        return productRepo.findById(id)
            .orElseThrow(() -> new NotFoundException("Product not found"));
    }
    
    @CacheEvict(value = "products", key = "#id")
    public void updateProduct(Long id, Product product) {
        productRepo.save(product);
    }
}`,
    language: 'java',
    refactors: 11,
    comments: 27,
    runs: 143,
    time: '5h ago',
    liked: false,
    bookmarked: false,
    upvotes: 134
  }
]

export const notifications = [
  { id: 'san1', type: 'refactor', user: 'Ravi Kumar', avatar: 'RK', karma: 5120, action: 'suggested a refactor on your snippet', content: 'Spring Security JWT filter', time: '5m ago', unread: true, language: 'java' },
  { id: 'san2', type: 'star', user: 'Meera Singh', avatar: 'MS', karma: 3450, action: 'starred your code snippet', content: 'Hibernate batch insert pattern', time: '30m ago', unread: true, stars: 89 },
  { id: 'san3', type: 'pr_approved', user: 'Ankit Joshi', avatar: 'AJ', karma: 4210, action: 'approved your pull request', content: 'feat: add Redis caching layer', time: '2h ago', unread: true, repo: 'product-service' },
  { id: 'san4', type: 'comment', user: 'Shreya Iyer', avatar: 'SI', karma: 2760, action: 'commented on your snippet', content: 'Consider using @Transactional here', time: '4h ago', unread: false },
  { id: 'san5', type: 'follow', user: 'Dev Patel', avatar: 'DP', karma: 1540, action: 'started following you', content: null, time: '6h ago', unread: false, skills: ['Spring', 'Kafka'] },
  { id: 'san6', type: 'pr_merged', user: 'CI Bot', avatar: '🤖', karma: null, action: 'merged your pull request', content: 'fix: connection pool leak', time: '1d ago', unread: false, repo: 'db-service' },
]

export const conversations = [
  { 
    id: 'sac1', 
    name: 'Ravi Kumar', 
    handle: '@ravikumar', 
    avatar: 'RK', 
    lastMessage: 'The microservice architecture looks solid 👍',
    time: '5m',
    karma: 5120,
    skills: ['Java', 'Spring'],
    hasCode: true,
    project: 'product-service',
    unread: 3
  },
  { 
    id: 'sac2', 
    name: 'Meera Singh', 
    handle: '@meerasingh', 
    avatar: 'MS', 
    lastMessage: 'SQL query optimized, check the explain plan',
    time: '20m',
    karma: 3450,
    skills: ['SQL', 'PostgreSQL'],
    hasCode: true,
    project: 'analytics-db',
    unread: 1
  },
  { 
    id: 'sac3', 
    name: 'Backend Guild', 
    handle: '6 members', 
    avatar: '👥', 
    lastMessage: 'Ankit: Deployed v2.1 to staging',
    time: '2h',
    karma: null,
    skills: [],
    hasCode: false,
    project: 'infra-ops',
    isGroup: true,
    unread: 8
  },
]

export const comments = {
  'sa1': [
    { id: 'sac1a', user: { name: 'Shreya Iyer', avatar: 'SI', handle: '@shreyaiyer' }, text: 'Optional is the way! No more NPEs in our codebase.', time: '45m ago', likes: 15 },
    { id: 'sac1b', user: { name: 'Dev Patel', avatar: 'DP', handle: '@devpatel' }, text: 'We switched all our services to this pattern last month', time: '30m ago', likes: 9 },
  ],
  'sa2': [
    { id: 'sac2a', user: { name: 'Ravi Kumar', avatar: 'RK', handle: '@ravikumar' }, text: 'Window functions + CTEs = unstoppable combo', time: '1h ago', likes: 18 },
  ],
  'sa3': []
}

export const bugStories = [
  { id: 'sab1', user: 'RK', name: 'Ravi', error: 'OOM', solved: false, description: 'OutOfMemoryError on batch processing 10M records', code: 'List<Record> all = repo.findAll();', language: 'java' },
  { id: 'sab2', user: 'MS', name: 'Meera', error: 'Deadlock', solved: true, description: 'Database deadlock on concurrent transactions', code: 'SELECT ... FOR UPDATE', language: 'java' },
  { id: 'sab3', user: 'AJ', name: 'Ankit', error: 'Timeout', solved: false, description: 'Connection timeout to Redis cluster', code: 'RedisTemplate.opsForValue().get(key)', language: 'java' },
  { id: 'sab4', user: 'SI', name: 'Shreya', error: 'ClassCast', solved: false, description: 'ClassCastException with generics erasure', code: 'List<String> list = (List) rawList;', language: 'java' },
  { id: 'sab5', user: 'DP', name: 'Dev', error: '503', solved: true, description: 'Service unavailable after deploy', code: 'kubectl rollout restart deployment/api', language: 'java' },
]
