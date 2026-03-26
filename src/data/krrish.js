// ============================================
// KRRISH GAUTAM — User-specific data
// Systems programming / C++ / Rust-focused feed
// ============================================

export const posts = [
  {
    id: 'k1',
    user: { name: 'Aditya Nair', handle: '@adityanair', avatar: 'AN', badge: 'Rustacean', karma: 6340 },
    content: 'Ownership in Rust is beautiful once it clicks. Here\'s a clean example 🦀',
    code: `fn main() {
    let s1 = String::from("hello");
    let s2 = s1; // s1 is moved, not copied
    
    // println!("{}", s1); // ERROR: s1 no longer valid
    println!("{}", s2); // Works fine
    
    let s3 = s2.clone(); // Explicit deep copy
    println!("{} {}", s2, s3); // Both valid
}

// Zero-cost abstractions, zero memory leaks`,
    language: 'rust',
    refactors: 18,
    comments: 45,
    runs: 267,
    time: '1h ago',
    liked: true,
    bookmarked: false,
    upvotes: 198
  },
  {
    id: 'k2',
    user: { name: 'Ishaan Malik', handle: '@ishaanmalik', avatar: 'IM', badge: 'C++ Veteran', karma: 8120 },
    content: 'Smart pointers eliminate 90% of memory bugs. Stop using raw pointers! 🎯',
    code: `#include <memory>
#include <iostream>

class Resource {
public:
    Resource() { std::cout << "Acquired\\n"; }
    ~Resource() { std::cout << "Released\\n"; }
    void use() { std::cout << "Using resource\\n"; }
};

int main() {
    auto ptr = std::make_unique<Resource>();
    ptr->use();
    
    // No delete needed — RAII handles cleanup
    // No memory leaks, no dangling pointers
    return 0;
}`,
    language: 'cpp',
    refactors: 14,
    comments: 38,
    runs: 312,
    time: '3h ago',
    liked: false,
    bookmarked: true,
    upvotes: 156
  },
  {
    id: 'k3',
    user: { name: 'Tara Khanna', handle: '@tarakhanna', avatar: 'TK', badge: 'Algo Queen', karma: 5670 },
    content: 'Implemented Dijkstra\'s with a priority queue. O(V + E log V) 🏎️',
    code: `#include <queue>
#include <vector>
using namespace std;

vector<int> dijkstra(vector<vector<pair<int,int>>>& graph, int src) {
    int n = graph.size();
    vector<int> dist(n, INT_MAX);
    priority_queue<pair<int,int>, vector<pair<int,int>>, greater<>> pq;
    
    dist[src] = 0;
    pq.push({0, src});
    
    while (!pq.empty()) {
        auto [d, u] = pq.top(); pq.pop();
        if (d > dist[u]) continue;
        for (auto [v, w] : graph[u]) {
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                pq.push({dist[v], v});
            }
        }
    }
    return dist;
}`,
    language: 'cpp',
    refactors: 9,
    comments: 22,
    runs: 189,
    time: '5h ago',
    liked: false,
    bookmarked: false,
    upvotes: 143
  }
]

export const notifications = [
  { id: 'kn1', type: 'refactor', user: 'Aditya Nair', avatar: 'AN', karma: 6340, action: 'suggested a refactor on your snippet', content: 'Rust trait impl for Parser', time: '3m ago', unread: true, language: 'rust' },
  { id: 'kn2', type: 'star', user: 'Ishaan Malik', avatar: 'IM', karma: 8120, action: 'starred your code snippet', content: 'Lock-free queue implementation', time: '20m ago', unread: true, stars: 234 },
  { id: 'kn3', type: 'pr_approved', user: 'Tara Khanna', avatar: 'TK', karma: 5670, action: 'approved your pull request', content: 'feat: SIMD vectorization', time: '1h ago', unread: true, repo: 'perf-engine' },
  { id: 'kn4', type: 'comment', user: 'Rohan Das', avatar: 'RD', karma: 3210, action: 'commented on your snippet', content: 'Consider cache line alignment here', time: '3h ago', unread: false },
  { id: 'kn5', type: 'follow', user: 'Kavya Rao', avatar: 'KR', karma: 2100, action: 'started following you', content: null, time: '5h ago', unread: false, skills: ['Rust', 'WASM'] },
  { id: 'kn6', type: 'pr_merged', user: 'Build Bot', avatar: '🤖', karma: null, action: 'merged your pull request', content: 'fix: race condition in thread pool', time: '8h ago', unread: false, repo: 'thread-pool' },
  { id: 'kn7', type: 'mention', user: 'Ishaan Malik', avatar: 'IM', karma: 8120, action: 'mentioned you in a discussion', content: '@krrish_gautam can you review the allocator?', time: '1d ago', unread: false },
]

export const conversations = [
  { 
    id: 'kc1', 
    name: 'Aditya Nair', 
    handle: '@adityanair', 
    avatar: 'AN', 
    lastMessage: 'The Rust borrow checker caught a subtle bug 🦀',
    time: '3m',
    karma: 6340,
    skills: ['Rust', 'WASM'],
    hasCode: true,
    project: 'rust-parser',
    unread: 4
  },
  { 
    id: 'kc2', 
    name: 'Ishaan Malik', 
    handle: '@ishaanmalik', 
    avatar: 'IM', 
    lastMessage: 'Benchmark results are insane, 3x faster 🔥',
    time: '25m',
    karma: 8120,
    skills: ['C++', 'Systems'],
    hasCode: true,
    project: 'perf-engine',
    unread: 2
  },
  { 
    id: 'kc3', 
    name: 'Systems Gang', 
    handle: '5 members', 
    avatar: '👥', 
    lastMessage: 'Tara: Lock-free stack passes all tests ✅',
    time: '1h',
    karma: null,
    skills: [],
    hasCode: true,
    project: 'concurrent-ds',
    isGroup: true,
    unread: 6
  },
]

export const comments = {
  'k1': [
    { id: 'kc1a', user: { name: 'Rohan Das', avatar: 'RD', handle: '@rohandas' }, text: 'Ownership is what makes Rust memory-safe without a GC. Brilliant!', time: '30m ago', likes: 22 },
    { id: 'kc1b', user: { name: 'Kavya Rao', avatar: 'KR', handle: '@kavyarao' }, text: 'Clone vs Copy trait distinction is key here', time: '20m ago', likes: 14 },
  ],
  'k2': [
    { id: 'kc2a', user: { name: 'Tara Khanna', avatar: 'TK', handle: '@tarakhanna' }, text: 'RAII is one of the best patterns ever invented', time: '1h ago', likes: 31 },
  ],
  'k3': []
}

export const bugStories = [
  { id: 'kb1', user: 'AN', name: 'Aditya', error: 'Borrow', solved: false, description: 'Cannot borrow as mutable — lifetime conflict', code: 'let ref1 = &mut vec; let ref2 = &vec;', language: 'rust' },
  { id: 'kb2', user: 'IM', name: 'Ishaan', error: 'Segfault', solved: true, description: 'Use-after-free in linked list traversal', code: 'Node* curr = head; delete curr; curr->next;', language: 'cpp' },
  { id: 'kb3', user: 'TK', name: 'Tara', error: 'TLE', solved: false, description: 'Time limit exceeded on graph problem', code: 'for(int i=0;i<n;i++) for(int j=0;j<n;j++)', language: 'cpp' },
  { id: 'kb4', user: 'RD', name: 'Rohan', error: 'UB', solved: false, description: 'Undefined behavior with signed overflow', code: 'int x = INT_MAX; x++;', language: 'cpp' },
  { id: 'kb5', user: 'KR', name: 'Kavya', error: 'Panic', solved: true, description: 'Thread panic on unwrap of None', code: 'let val = map.get("key").unwrap();', language: 'rust' },
]
