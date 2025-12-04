import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ThumbsUp, ThumbsDown, ExternalLink, Menu, X } from 'lucide-react';

// Content data for each section
const contentData = {
    'issues': {
        title: 'Issues',
        intro: 'Track and manage bugs, feature requests, and tasks with DevHub Issues.',
        sections: [
            {
                heading: 'What are Issues?',
                content: 'Issues are a great way to keep track of tasks, enhancements, and bugs for your projects. They can be used to collect user feedback, report software bugs, and organize tasks you\'d like to accomplish with your team.'
            },
            {
                heading: 'Creating Issues',
                content: 'You can create an issue in a variety of ways, so you can choose the most convenient method for your workflow. Issues can be created from a repository, from a project board, from a comment in an issue or pull request, or from a specific line of code.'
            },
            {
                heading: 'Managing Issues',
                content: 'Issues can be assigned to specific people, labeled for easy filtering, and linked to pull requests. You can also use milestones to track progress on groups of issues or pull requests in a repository.'
            }
        ]
    },
    'projects': {
        title: 'Projects',
        intro: 'Organize and prioritize your work with flexible project boards.',
        sections: [
            {
                heading: 'Project Boards',
                content: 'Project boards on DevHub help you organize and prioritize your work. You can create project boards for specific feature work, comprehensive roadmaps, or even release checklists. With project boards, you have the flexibility to create customized workflows that suit your needs.'
            },
            {
                heading: 'Project Types',
                content: 'DevHub offers both classic projects and the new Projects (beta) experience. The new Projects provides more powerful features including custom fields, multiple views, and advanced automation capabilities.'
            },
            {
                heading: 'Collaboration',
                content: 'Project boards make it easy for teams to collaborate. You can share project boards with your team, assign tasks, and track progress all in one place. Team members can see what everyone is working on and what needs attention.'
            }
        ]
    },
    'learning-about-projects': {
        title: 'Learning about Projects',
        intro: 'Projects is an adaptable, flexible tool for planning and tracking work on DevHub.',
        sections: [
            {
                heading: 'About Projects',
                content: 'A project is an adaptable table, board, and roadmap that integrates with your issues and pull requests on DevHub to help you plan and track your work effectively at the user or organization level. You can create and customize multiple views by filtering, sorting, slicing, and grouping your issues and pull requests to manage your team backlogs and roadmaps, visualize work with configurable charts, add custom fields to track metadata specific to your team, create templates, share status updates, and automate your projects. Rather than enforcing a specific methodology, a project provides flexible features you can customize to your team\'s needs and processes.'
            },
            {
                heading: 'Staying up-to-date',
                content: 'Your projects are built from the issues and pull requests you add, creating direct references between your project and your work. Information is synced automatically to your project as you make changes, updating your views and charts. This integration works both ways, so that when you change information about a pull request or issue in your project, the pull request or issue reflects that information.'
            },
            {
                heading: 'Viewing your project from different perspectives',
                content: 'Quickly answer your most pressing questions by tailoring your project view to give you the information you need. You can save these views, allowing you to quickly return to them as needed and make them available to your team.'
            }
        ]
    },
    'creating-projects': {
        title: 'Creating Projects',
        intro: 'Learn how to create and set up a new project on DevHub.',
        sections: [
            {
                heading: 'Getting Started',
                content: 'You can create a project from your user profile or from an organization. Projects can be scoped to your personal account or shared with teams in an organization. To create a project, navigate to your profile or organization, click on "Projects", and then click "New project".'
            },
            {
                heading: 'Choosing a Template',
                content: 'DevHub provides several project templates to help you get started quickly. You can choose from templates like "Team backlog", "Feature", "Bug triage", or start with a blank project and customize it to your needs.'
            },
            {
                heading: 'Initial Configuration',
                content: 'After creating your project, you can configure the initial settings including the project name, description, and visibility. You can also set up custom fields, views, and automation rules to match your workflow.'
            }
        ]
    },
    'managing-items': {
        title: 'Managing Items in Your Project',
        intro: 'Add, organize, and track issues and pull requests in your project.',
        sections: [
            {
                heading: 'Adding Items',
                content: 'You can add existing issues and pull requests to your project, or create new ones directly from the project board. Items can be added individually or in bulk, and you can also set up automation to automatically add items that match certain criteria.'
            },
            {
                heading: 'Organizing Items',
                content: 'Use custom fields, labels, and milestones to organize your items. You can group items by any field, sort them by priority or status, and filter to focus on specific subsets of work. Drag and drop items to reorder them or move them between columns.'
            },
            {
                heading: 'Tracking Progress',
                content: 'Monitor the progress of your work using project views and charts. You can see at a glance which items are in progress, blocked, or completed. Use iteration fields to plan sprints and track velocity over time.'
            }
        ]
    },
    'understanding-fields': {
        title: 'Understanding Fields',
        intro: 'Learn about built-in and custom fields to track metadata in your projects.',
        sections: [
            {
                heading: 'Built-in Fields',
                content: 'Projects come with several built-in fields including Title, Assignees, Status, Labels, Milestone, and Repository. These fields are automatically populated from your issues and pull requests and stay in sync with changes.'
            },
            {
                heading: 'Custom Fields',
                content: 'Create custom fields to track information specific to your team\'s workflow. You can add text fields, number fields, date fields, single select, and iteration fields. Custom fields help you capture and organize metadata that matters to your team.'
            },
            {
                heading: 'Field Configuration',
                content: 'Configure field options, set default values, and control field visibility. You can also use fields in automation rules to automatically update items based on field values or trigger actions when fields change.'
            }
        ]
    },
    'customizing-views': {
        title: 'Customizing Views',
        intro: 'Create different views to visualize your project data in various ways.',
        sections: [
            {
                heading: 'View Types',
                content: 'Projects support multiple view types including table view, board view, and roadmap view. Each view type offers different ways to visualize and interact with your project data. You can create as many views as you need and switch between them easily.'
            },
            {
                heading: 'Filtering and Sorting',
                content: 'Apply filters to show only the items that match specific criteria. You can filter by any field, including custom fields, and combine multiple filters for precise control. Sort items by any field to organize them in the order that makes sense for your workflow.'
            },
            {
                heading: 'Grouping and Slicing',
                content: 'Group items by field values to create swimlanes or columns in your views. This is particularly useful in board view where you can group by status, assignee, or any custom field. Slicing allows you to break down your data into manageable chunks.'
            }
        ]
    },
    'automating-projects': {
        title: 'Automating Projects',
        intro: 'Set up automation rules to streamline your project workflows.',
        sections: [
            {
                heading: 'Built-in Automation',
                content: 'Projects include built-in automation workflows that help you manage items automatically. For example, you can automatically set the status of newly added items, or update the status when a pull request is merged.'
            },
            {
                heading: 'Custom Workflows',
                content: 'Create custom automation workflows using triggers and actions. Triggers can be events like "item added", "field changed", or "pull request merged". Actions can update fields, add labels, or move items between views.'
            },
            {
                heading: 'DevHub Actions Integration',
                content: 'For more advanced automation, you can integrate DevHub Actions with your projects. This allows you to create complex workflows that interact with external services, run scripts, or perform custom logic based on project events.'
            }
        ]
    },
    'viewing-insights': {
        title: 'Viewing Insights',
        intro: 'Analyze your project data with charts and insights.',
        sections: [
            {
                heading: 'Project Charts',
                content: 'Create charts to visualize your project data and track trends over time. You can create bar charts, line charts, and stacked area charts based on any field in your project. Charts help you identify bottlenecks, track progress, and make data-driven decisions.'
            },
            {
                heading: 'Configuring Charts',
                content: 'Configure your charts by selecting the data to display, choosing the chart type, and applying filters. You can group data by different fields, set time ranges, and customize the appearance of your charts to highlight the information that matters most.'
            },
            {
                heading: 'Sharing Insights',
                content: 'Share your project insights with stakeholders by adding charts to your project views or exporting them for presentations. Charts update automatically as your project data changes, ensuring everyone has access to the latest information.'
            }
        ]
    },
    'managing-project': {
        title: 'Managing Your Project',
        intro: 'Configure settings, permissions, and workflows for your project.',
        sections: [
            {
                heading: 'Project Settings',
                content: 'Access project settings to configure the project name, description, visibility, and other options. You can also manage custom fields, set up automation workflows, and configure integrations with other tools.'
            },
            {
                heading: 'Access Control',
                content: 'Control who can view and edit your project by managing access permissions. You can grant access to individual users or teams, and set different permission levels including read, write, and admin access.'
            },
            {
                heading: 'Project Templates',
                content: 'Save your project configuration as a template to quickly create similar projects in the future. Templates include your custom fields, views, and automation rules, making it easy to standardize workflows across your organization.'
            }
        ]
    },
    'finding-projects': {
        title: 'Finding Your Projects',
        intro: 'Discover and access projects across DevHub.',
        sections: [
            {
                heading: 'Project Discovery',
                content: 'Find projects from your user profile, organization pages, or repository pages. You can see all projects you have access to, including personal projects and organization projects. Use the search and filter options to quickly locate specific projects.'
            },
            {
                heading: 'Recent Projects',
                content: 'Access your recently viewed projects from the projects dropdown menu. DevHub keeps track of the projects you\'ve visited, making it easy to return to the projects you work with most frequently.'
            },
            {
                heading: 'Project Links',
                content: 'Projects can be linked from issues, pull requests, and repositories. When viewing an issue or pull request, you can see which projects it belongs to and navigate directly to those projects.'
            }
        ]
    },
    'sharing-updates': {
        title: 'Sharing Project Updates',
        intro: 'Keep stakeholders informed with project status updates.',
        sections: [
            {
                heading: 'Status Updates',
                content: 'Create status updates to share progress, highlights, and blockers with your team and stakeholders. Status updates can include text, images, and links to provide context and keep everyone informed about project developments.'
            },
            {
                heading: 'Update Frequency',
                content: 'Establish a regular cadence for sharing project updates. Whether it\'s daily standups, weekly summaries, or monthly reviews, consistent communication helps teams stay aligned and stakeholders stay informed.'
            },
            {
                heading: 'Distribution',
                content: 'Share status updates through various channels including project pages, team discussions, or external communication tools. You can also export project data and charts to include in presentations or reports.'
            }
        ]
    },
    'labels-milestones': {
        title: 'Labels and Milestones',
        intro: 'Organize and track work using labels and milestones.',
        sections: [
            {
                heading: 'Using Labels',
                content: 'Labels help you categorize and filter issues and pull requests. You can create custom labels for different types of work, priorities, or any other classification that makes sense for your project. Labels are color-coded for easy visual identification.'
            },
            {
                heading: 'Milestone Planning',
                content: 'Milestones are used to track progress on groups of issues or pull requests. They\'re perfect for tracking work for a specific release, sprint, or project phase. Each milestone shows the percentage of completed items and the due date.'
            },
            {
                heading: 'Best Practices',
                content: 'Establish a consistent labeling scheme across your organization to make it easier to find and filter issues. Use milestones to plan releases and track progress toward major goals. Combine labels and milestones with project boards for comprehensive project management.'
            }
        ]
    },
    'guides': {
        title: 'Guides',
        intro: 'Step-by-step tutorials and best practices for using DevHub.',
        sections: [
            {
                heading: 'Getting Started Guides',
                content: 'New to DevHub? Our getting started guides walk you through the basics of creating repositories, managing issues, collaborating with pull requests, and setting up your first project. These guides are designed for beginners and provide hands-on examples.'
            },
            {
                heading: 'Advanced Tutorials',
                content: 'Take your DevHub skills to the next level with advanced tutorials covering topics like DevHub Actions, API integration, advanced project automation, and enterprise features. These guides assume familiarity with DevHub basics and dive deep into specific topics.'
            },
            {
                heading: 'Best Practices',
                content: 'Learn from the DevHub community with guides on best practices for code review, project management, security, and team collaboration. These guides share proven strategies and patterns used by successful teams on DevHub.'
            }
        ]
    }
};

export default function Docs() {
    const [feedback, setFeedback] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('learning-about-projects');

    const handleFeedback = (type) => {
        setFeedback(type);
        console.log(`User feedback: ${type}`);
        // In a real app, you would send this to a backend
    };

    const handleSectionClick = (sectionId) => {
        setActiveSection(sectionId);
        setFeedback(null); // Reset feedback when changing sections
        // Close mobile sidebar after selection
        if (window.innerWidth < 1024) {
            setSidebarOpen(false);
        }
    };

    const currentContent = contentData[activeSection];

    return (
        <div className="bg-[#0d1117] min-h-screen text-slate-300">
            {/* Hero Section */}
            <div className="relative h-48 sm:h-64 md:h-80 overflow-hidden border-b border-slate-800">
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0d1117] to-[#161b22]" />
                </div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
                        DevHub Docs
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl text-slate-400 max-w-2xl">
                        Help for wherever you are on your DevHub journey.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                {/* Mobile Sidebar Toggle */}
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="lg:hidden mb-4 flex items-center gap-2 px-4 py-2 bg-slate-800 text-white rounded-md hover:bg-slate-700 transition-colors"
                >
                    {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    <span>{sidebarOpen ? 'Close' : 'Open'} Navigation</span>
                </button>

                <div className="flex flex-col lg:flex-row gap-8 sm:gap-12">
                    {/* Sidebar */}
                    <aside className={`lg:w-64 flex-shrink-0 ${sidebarOpen ? 'block' : 'hidden lg:block'}`}>
                        <div className="lg:sticky lg:top-24">
                            <h3 className="font-bold text-white mb-4 px-2">
                                DevHub Issues
                            </h3>
                            <nav className="space-y-1">
                                <NavItem
                                    onClick={() => handleSectionClick('issues')}
                                    label="Issues"
                                    active={activeSection === 'issues'}
                                />
                                <NavItem
                                    onClick={() => handleSectionClick('projects')}
                                    label="Projects"
                                    active={activeSection === 'projects'}
                                />
                                <NavItem
                                    onClick={() => handleSectionClick('learning-about-projects')}
                                    label="Learning about Projects"
                                    active={activeSection === 'learning-about-projects'}
                                />
                                <div className="pl-4 space-y-1 border-l border-slate-800 ml-2">
                                    <NavItem
                                        onClick={() => handleSectionClick('creating-projects')}
                                        label="Creating projects"
                                        active={activeSection === 'creating-projects'}
                                    />
                                    <NavItem
                                        onClick={() => handleSectionClick('managing-items')}
                                        label="Managing items in your project"
                                        active={activeSection === 'managing-items'}
                                    />
                                    <NavItem
                                        onClick={() => handleSectionClick('understanding-fields')}
                                        label="Understanding fields"
                                        active={activeSection === 'understanding-fields'}
                                    />
                                    <NavItem
                                        onClick={() => handleSectionClick('customizing-views')}
                                        label="Customizing views"
                                        active={activeSection === 'customizing-views'}
                                    />
                                    <NavItem
                                        onClick={() => handleSectionClick('automating-projects')}
                                        label="Automating projects"
                                        active={activeSection === 'automating-projects'}
                                    />
                                    <NavItem
                                        onClick={() => handleSectionClick('viewing-insights')}
                                        label="Viewing insights"
                                        active={activeSection === 'viewing-insights'}
                                    />
                                    <NavItem
                                        onClick={() => handleSectionClick('managing-project')}
                                        label="Managing your project"
                                        active={activeSection === 'managing-project'}
                                    />
                                </div>
                                <NavItem
                                    onClick={() => handleSectionClick('finding-projects')}
                                    label="Finding your projects"
                                    active={activeSection === 'finding-projects'}
                                />
                                <NavItem
                                    onClick={() => handleSectionClick('sharing-updates')}
                                    label="Sharing project updates"
                                    active={activeSection === 'sharing-updates'}
                                />
                                <NavItem
                                    onClick={() => handleSectionClick('labels-milestones')}
                                    label="Labels and milestones"
                                    active={activeSection === 'labels-milestones'}
                                />
                                <NavItem
                                    onClick={() => handleSectionClick('guides')}
                                    label="Guides"
                                    active={activeSection === 'guides'}
                                />
                            </nav>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1 min-w-0">
                        <div className="prose prose-invert max-w-none">
                            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">
                                {currentContent.title}
                            </h1>
                            <p className="text-base sm:text-lg text-slate-300 mb-6 sm:mb-8">
                                {currentContent.intro}
                            </p>

                            {currentContent.sections.map((section, index) => (
                                <div key={index}>
                                    <h2 className="text-xl sm:text-2xl font-bold text-white mt-8 sm:mt-12 mb-3 sm:mb-4 group cursor-pointer">
                                        {section.heading}
                                        <span className="hidden group-hover:inline-block ml-2 text-slate-500">#</span>
                                    </h2>
                                    <p className="text-sm sm:text-base text-slate-300 mb-4 sm:mb-6 leading-relaxed">
                                        {section.content}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Help and Support Section */}
                        <div className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-slate-800">
                            {/* <h2 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6">Help and support</h2> */}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                                {/* <div className="bg-[#161b22] border border-slate-800 p-4 sm:p-6 rounded-lg">
                                    <h3 className="font-semibold text-white mb-3 sm:mb-4 text-sm sm:text-base">Did you find what you needed?</h3>
                                    {feedback ? (
                                        <div className="text-green-400 font-medium text-sm">
                                            Thanks for your feedback!
                                        </div>
                                    ) : (
                                        <div className="flex gap-3 sm:gap-4">
                                            <button
                                                onClick={() => handleFeedback('yes')}
                                                className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-slate-800 border border-slate-700 rounded-md hover:bg-slate-700 text-slate-300 transition-colors text-sm"
                                            >
                                                <ThumbsUp className="w-4 h-4" /> Yes
                                            </button>
                                            <button
                                                onClick={() => handleFeedback('no')}
                                                className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-slate-800 border border-slate-700 rounded-md hover:bg-slate-700 text-slate-300 transition-colors text-sm"
                                            >
                                                <ThumbsDown className="w-4 h-4" /> No
                                            </button>
                                        </div>
                                    )}
                                    <a href="#" className="block mt-3 sm:mt-4 text-xs sm:text-sm text-blue-400 hover:underline">Privacy policy</a>
                                </div> */}

                                <div className="bg-[#161b22] border border-slate-800 p-4 sm:p-6 rounded-lg">
                                    <h3 className="font-semibold text-white mb-3 sm:mb-4 text-sm sm:text-base">Help us make these docs great!</h3>
                                    <p className="text-xs sm:text-sm text-slate-400 mb-3 sm:mb-4">
                                        All DevHub docs are open source. See something that's wrong or unclear? Submit a pull request.
                                    </p>
                                    <Link
                                        to="/signup"
                                        className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-slate-800 text-white rounded-md hover:bg-slate-700 transition-colors font-medium text-xs sm:text-sm"
                                    >
                                        <ExternalLink className="w-4 h-4" /> Make a contribution
                                    </Link>
                                    {/* <a href="#" className="block mt-3 sm:mt-4 text-xs sm:text-sm text-blue-400 hover:underline">Learn how to contribute</a> */}
                                </div>
                            </div>

                            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center text-center">
                                {/* <Link to="/login" className="text-blue-400 hover:underline font-medium text-sm">
                                    Still need help?
                                </Link> */}
                                {/* <span className="text-slate-600 hidden sm:inline"></span> */}
                                <Link to="/login" className="text-blue-400 hover:underline font-medium text-sm">
                                    Get Started
                                </Link>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}

function NavItem({ onClick, label, active = false }) {
    return (
        <button
            onClick={onClick}
            className={`w-full text-left block px-2 py-1.5 text-xs sm:text-sm rounded-md transition-colors ${active
                ? 'bg-blue-900/30 text-blue-400 font-medium'
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
        >
            {label}
        </button>
    );
}
