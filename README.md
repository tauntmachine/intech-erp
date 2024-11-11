# Getting Started with Vite and React

This project was migrated to [Vite](https://vitejs.dev/), a faster and more optimized build tool.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in development mode.  
Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

The page will reload when you make changes.  
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `dist` folder.  
It optimizes the build for the best performance using Vite's advanced build tools.

The build is minified, and the filenames include hashes.  
Your app is ready to be deployed!

### `npm run serve`

Serves the production build locally to preview it.  
Use this to test how your app will perform in production.

## Learn More

To learn more about Vite, check out the [Vite documentation](https://vitejs.dev/guide/).  
To learn React, check out the [React documentation](https://reactjs.org/).

## Key Differences After Migration:

- Vite is significantly faster than CRA, especially during development.
- Vite uses the `dist` folder for the production build instead of `build`.
- Some environment variables might have changed (`VITE_` prefix is required for custom variables).

## Tips for Migration:

- Make sure all environment variables are updated with the `VITE_` prefix (e.g., `REACT_APP_` becomes `VITE_`).
- If you're using any CRA-specific features like file imports or environment variable handling, review the Vite documentation for corresponding changes.
