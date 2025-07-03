const fs = require('fs');
const path = require('path');

// Create the redirect HTML content
const redirectHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Realty Direct | Queensland Real Estate Platform</title>
    <meta name="description" content="Discover premium real estate in Queensland. Professional property listings, expert guidance, and innovative real estate solutions across Brisbane and Gold Coast.">
    <meta name="keywords" content="Queensland real estate, Brisbane properties, Gold Coast homes, property listings, real estate agent">
    <meta http-equiv="refresh" content="0; url=/en/">
    <link rel="canonical" href="https://realtydirect.com.au/en/">
    
    <!-- Open Graph -->
    <meta property="og:title" content="Realty Direct | Queensland Real Estate Platform">
    <meta property="og:description" content="Discover premium real estate in Queensland">
    <meta property="og:url" content="https://realtydirect.com.au">
    <meta property="og:type" content="website">
    <meta property="og:locale" content="en_AU">
    
    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Realty Direct | Queensland Real Estate Platform">
    <meta name="twitter:description" content="Discover premium real estate in Queensland">
    
    <!-- Styles -->
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            background: linear-gradient(135deg, #102542 0%, #223354 100%);
            color: white;
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
        }
        
        .container {
            text-align: center;
            max-width: 400px;
            padding: 2rem;
        }
        
        .logo {
            font-size: 2.5rem;
            font-weight: 800;
            margin-bottom: 1rem;
            background: linear-gradient(45deg, #ffffff, #d1d5db);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        
        .tagline {
            font-size: 1.1rem;
            color: #d1d5db;
            margin-bottom: 2rem;
            font-weight: 400;
        }
        
        .spinner {
            width: 40px;
            height: 40px;
            border: 3px solid rgba(209, 213, 219, 0.3);
            border-top: 3px solid #ffffff;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 1.5rem;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        .loading-text {
            font-size: 1rem;
            color: #b0b7bd;
            margin-bottom: 2rem;
        }
        
        .fallback-link {
            display: inline-block;
            color: #ffffff;
            text-decoration: none;
            padding: 0.75rem 1.5rem;
            border: 2px solid rgba(255, 255, 255, 0.3);
            border-radius: 0.5rem;
            transition: all 0.3s ease;
            font-weight: 500;
        }
        
        .fallback-link:hover {
            background: rgba(255, 255, 255, 0.1);
            border-color: rgba(255, 255, 255, 0.5);
            transform: translateY(-2px);
        }
        
        @media (max-width: 480px) {
            .container {
                padding: 1.5rem;
            }
            
            .logo {
                font-size: 2rem;
            }
            
            .tagline {
                font-size: 1rem;
            }
        }
        
        /* Accessibility */
        @media (prefers-reduced-motion: reduce) {
            .spinner {
                animation: none;
            }
            
            .fallback-link {
                transition: none;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1 class="logo">Realty Direct</h1>
        <p class="tagline">Queensland Real Estate Platform</p>
        
        <div class="spinner"></div>
        <p class="loading-text">Redirecting to your destination...</p>
        
        <noscript>
            <p style="margin-bottom: 1rem; color: #f59e42;">JavaScript is disabled. Please click the link below:</p>
        </noscript>
        
        <a href="/en/" class="fallback-link">
            Continue to Realty Direct
        </a>
    </div>

    <script>
        // Immediate redirect using replace to avoid back button issues
        window.location.replace('/en/');
    </script>
</body>
</html>`;

// Write the redirect file to the out directory root
const outDir = path.join(process.cwd(), 'out');
const redirectPath = path.join(outDir, 'index.html');

try {
    // Ensure the out directory exists
    if (!fs.existsSync(outDir)) {
        console.error('Error: out directory does not exist. Make sure to run this after next build.');
        process.exit(1);
    }

    // Write the redirect file
    fs.writeFileSync(redirectPath, redirectHTML);
    console.log('✅ Created root redirect file at:', redirectPath);

    // Also copy CNAME file to root
    const cnamePath = path.join(outDir, 'CNAME');
    fs.writeFileSync(cnamePath, 'realtydirect.com.au');
    console.log('✅ Created CNAME file at:', cnamePath);

} catch (error) {
    console.error('Error creating redirect file:', error);
    process.exit(1);
}