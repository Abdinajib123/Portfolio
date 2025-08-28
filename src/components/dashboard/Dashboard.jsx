import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { 
  FolderOpen, 
  Code, 
  Plus, 
  TrendingUp, 
  Users, 
  Eye,
  ExternalLink
} from 'lucide-react';
import { projectsAPI, skillsAPI } from '../../services/api';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const [stats, setStats] = useState({
    projects: 0,
    skills: 0,
    featuredProjects: 0,
    totalViews: 0
  });
  const [recentProjects, setRecentProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch projects
      const projectsResponse = await projectsAPI.getAll({ limit: 5 });
      const projects = projectsResponse.data.projects;
      
      // Fetch skills
      const skillsResponse = await skillsAPI.getAll();
      const skills = skillsResponse.data.skills;
      
      // Calculate stats
      const featuredProjects = projects.filter(p => p.featured).length;
      
      setStats({
        projects: projectsResponse.data.pagination.total,
        skills: skills.length,
        featuredProjects,
        totalViews: Math.floor(Math.random() * 1000) + 500 // Mock data
      });
      
      setRecentProjects(projects);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, icon: Icon, color = 'bg-blue-500' }) => (
    <div className="bg-background border border-border rounded-lg p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-foreground/70">{title}</p>
          <p className="text-2xl font-bold text-foreground">{value}</p>
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-foreground/70">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-foreground/70">Welcome to your portfolio management dashboard</p>
        </div>
        <div className="flex space-x-3">
          <Button asChild>
            <Link to="/dashboard/projects/new">
              <Plus className="h-4 w-4 mr-2" />
              Add Project
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/">
              <Eye className="h-4 w-4 mr-2" />
              View Portfolio
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Projects"
          value={stats.projects}
          icon={FolderOpen}
          color="bg-blue-500"
        />
        <StatCard
          title="Total Skills"
          value={stats.skills}
          icon={Code}
          color="bg-green-500"
        />
        <StatCard
          title="Featured Projects"
          value={stats.featuredProjects}
          icon={TrendingUp}
          color="bg-purple-500"
        />
        <StatCard
          title="Portfolio Views"
          value={stats.totalViews}
          icon={Users}
          color="bg-orange-500"
        />
      </div>

      {/* Recent Projects */}
      <div className="bg-background border border-border rounded-lg">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">Recent Projects</h2>
            <Button variant="outline" asChild>
              <Link to="/dashboard/projects">
                View All
              </Link>
            </Button>
          </div>
        </div>
        <div className="p-6">
          {recentProjects.length === 0 ? (
            <div className="text-center py-8">
              <FolderOpen className="h-12 w-12 text-foreground/30 mx-auto mb-4" />
              <p className="text-foreground/70 mb-4">No projects yet</p>
              <Button asChild>
                <Link to="/dashboard/projects/new">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Project
                </Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {recentProjects.map((project) => (
                <div
                  key={project._id}
                  className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/5 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg flex items-center justify-center">
                      <FolderOpen className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">{project.title}</h3>
                      <p className="text-sm text-foreground/70">
                        {project.technologies.slice(0, 3).join(', ')}
                        {project.technologies.length > 3 && '...'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {project.featured && (
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                        Featured
                      </span>
                    )}
                    <Button variant="ghost" size="sm" asChild>
                      <Link to={`/dashboard/projects/${project._id}`}>
                        Edit
                      </Link>
                    </Button>
                    <Button variant="ghost" size="sm" asChild>
                      <a href={project.live} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-background border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <Button asChild className="w-full justify-start">
              <Link to="/dashboard/projects/new">
                <Plus className="h-4 w-4 mr-2" />
                Add New Project
              </Link>
            </Button>
            <Button variant="outline" asChild className="w-full justify-start">
              <Link to="/dashboard/skills/new">
                <Code className="h-4 w-4 mr-2" />
                Add New Skill
              </Link>
            </Button>
            <Button variant="outline" asChild className="w-full justify-start">
              <Link to="/dashboard/profile">
                <Users className="h-4 w-4 mr-2" />
                Update Profile
              </Link>
            </Button>
          </div>
        </div>

        <div className="bg-background border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Portfolio Status</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-foreground/70">Projects</span>
              <span className="font-medium text-foreground">{stats.projects}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-foreground/70">Skills</span>
              <span className="font-medium text-foreground">{stats.skills}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-foreground/70">Featured Projects</span>
              <span className="font-medium text-foreground">{stats.featuredProjects}</span>
            </div>
            <div className="pt-3 border-t border-border">
              <Button asChild className="w-full">
                <Link to="/">
                  <Eye className="h-4 w-4 mr-2" />
                  View Live Portfolio
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
