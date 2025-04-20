export default async function sitemap() {
    const baseUrl = process.env.SITE_URL || 'https://robosuperior.com';

    // Static routes - removed private routes
    const routes = [
        '',
        '/about',
        '/blog',
        '/project',
        '/achievement',
        '/members',
        '/contact',
        '/apps/shorturl',
        'privatenote/diary',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'daily',
        priority: route === '' ? 1 : 0.8,
    }));

    try {
        // Fetch blogs using the API endpoint
        const blogResponse = await fetch(`${baseUrl}/api/getblog`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-cache',
        });

        if (!blogResponse.ok) throw new Error('Failed to fetch blogs');
        const blogs = await blogResponse.json();

        // Create blog routes
        const blogRoutes = blogs.map((blog) => ({
            url: `${baseUrl}/blog/${blog.slug}`,
            lastModified: blog.updatedAt || new Date().toISOString(),
            changeFrequency: 'daily',
            priority: 0.7,
        }));

        // Fetch projects
        const projectResponse = await fetch(`${baseUrl}/api/getproject`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-cache',
        });

        if (!projectResponse.ok) throw new Error('Failed to fetch projects');
        const projects = await projectResponse.json();

        // Create project routes
        const projectRoutes = projects.map((project) => ({
            url: `${baseUrl}/project/${project.slug}`,
            lastModified: project.updatedAt || new Date().toISOString(),
            changeFrequency: 'daily',
            priority: 0.7,
        }));

        // Fetch achievements
        const achievementResponse = await fetch(`${baseUrl}/api/getachievement`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-cache',
        });

        if (!achievementResponse.ok) throw new Error('Failed to fetch achievements');
        const achievements = await achievementResponse.json();

        // Create achievement routes
        const achievementRoutes = achievements.map((achievement) => ({
            url: `${baseUrl}/achievement/${achievement.slug}`,
            lastModified: achievement.updatedAt || new Date().toISOString(),
            changeFrequency: 'daily',
            priority: 0.7,
        }));

        // Additional websites
        const additionalWebsites = [
            {
                baseUrl: 'https://code.robosuperior.com',
                routes: ['/login', '/dashboard', '/pricing'],
            },
            {
                baseUrl: 'https://meet.robosuperior.com',
                routes: ['/', '/login', '/chats', 'calls'],
            },
            {
                baseUrl: 'https:nurahmed.hackclub.app',
                routes: ['/',],
            },
            {
                baseUrl: 'https://chat.robosuperior.com',
                routes: ['/', '/login', '/chats', 'calls'],
            },
        ];

        const additionalRoutes = additionalWebsites.flatMap(({ baseUrl, routes }) =>
            routes.map((route) => ({
                url: `${baseUrl}${route}`,
                lastModified: new Date().toISOString(),
                changeFrequency: 'daily',
                priority: route === '/' ? 1 : 0.8,
            }))
        );

        // Combine all routes
        return [
            ...routes,
            ...(Array.isArray(blogRoutes) ? blogRoutes : []),
            ...(Array.isArray(projectRoutes) ? projectRoutes : []),
            ...(Array.isArray(achievementRoutes) ? achievementRoutes : []),
            ...additionalRoutes,
        ];
    } catch (error) {
        console.error('Error generating sitemap:', error);
        return routes;
    }
}
