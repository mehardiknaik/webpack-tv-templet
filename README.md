# Webpack TV Template

A modern React-based template for building TV applications with spatial navigation support, optimized for both web and Tizen platforms.

## 🚀 Features

- **Multi-platform Support**: Built for both web browsers and Tizen Smart TV platform
- **Spatial Navigation**: Integrated with `@noriginmedia/norigin-spatial-navigation` for TV remote control navigation
- **Modern React**: Built with React 19, TypeScript, and modern development practices
- **Responsive Design**: Scalable UI components optimized for TV screens (1920x1080)
- **Error Boundaries**: Comprehensive error handling with custom error boundary components
- **Keep Alive**: Page state persistence with `react-activation`
- **Lazy Loading**: Code splitting and lazy loading for optimal performance
- **Hot Reload**: Fast development with webpack dev server
- **CSS Modules**: Scoped styling with CSS modules
- **Linting**: ESLint with TypeScript and React plugins

## 📦 Installation

```bash
npm install
```

## 🛠️ Scripts

### Development

```bash
# Start development server for web
npm start

# Start development server for Tizen
npm run start:tizen
```

### Production Build

```bash
# Build for web
npm run build

# Build for Tizen
npm run build:tizen
```

### Code Quality

```bash
# Run ESLint
npm run lint

# Fix ESLint issues
npm run lint:fix
```

## 🏗️ Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── Focusable/       # Spatial navigation components
│   │   ├── Focusable.tsx    # Base focusable component
│   │   ├── Vertical.tsx     # Vertical navigation container
│   │   ├── Curosel.tsx      # Horizontal carousel component
│   │   └── ScrollProvider.tsx # Scroll context provider
│   ├── Counter.tsx      # Example counter component
│   ├── DemoError.tsx    # Error demonstration component
│   └── ErrorBoundary.tsx # Error boundary component
├── screens/             # Application screens
│   ├── HomeScreen.tsx   # Home screen component
│   └── DetailScreen.tsx # Detail screen component
├── HOC/                 # Higher-Order Components
│   ├── withErrorBoundary.tsx # Error boundary HOC
│   ├── withKeepAlive.tsx     # Keep alive HOC
│   └── withSuspense.tsx      # Suspense HOC
├── util/                # Utility functions
│   ├── constant.ts      # Application constants
│   ├── platform.ts      # Platform detection
│   └── Screen.ts        # Screen utilities
├── assets/              # Static assets
└── App.tsx             # Main application component
```

## 🎮 Spatial Navigation

This template uses `@noriginmedia/norigin-spatial-navigation` for TV remote control navigation. Key features:

- **Focusable Components**: Wrap elements with `<Focusable>` to make them navigable
- **Vertical Navigation**: Use `<Vertical>` for vertical lists and menus
- **Horizontal Carousel**: Use `<Curosel>` for horizontal scrolling content
- **Focus Management**: Automatic focus management with visual indicators

### Example Usage

```tsx
import Focusable from './components/Focusable/Focusable';
import Vertical from './components/Focusable/Vertical';

<Vertical>
  <Focusable onPress={() => handleSelect(item)}>
    <div>Navigable Item</div>
  </Focusable>
</Vertical>;
```

## 🖥️ Screen Configuration

The template is optimized for TV screens with the following default settings:

- **Resolution**: 1920x1080
- **Base Font Size**: 50px
- **Animation Duration**: 0.2s

Configuration can be modified in `src/util/Screen.ts`.

## 🔧 Platform Support

### Web Platform

- Standard web browser support
- Desktop and mobile responsive design
- Development tools and hot reload

### Tizen Platform

- Samsung Smart TV compatibility
- Tizen-specific optimizations
- Platform-specific components (e.g., `DetailScreen.tizen.tsx`)

## 📱 Responsive Design

The template includes responsive design features:

- CSS modules for scoped styling
- Platform-specific styles (`.web.module.css` for web-only styles)
- Flexible grid system for different screen sizes

## 🧪 Development

### Adding New Components

1. Create component in `src/components/`
2. Add corresponding CSS module file
3. Export from component index if needed
4. Make focusable using `<Focusable>` wrapper if interactive

### Creating New Screens

1. Add screen component in `src/screens/`
2. Add route in `src/App.tsx`
3. Wrap with appropriate HOCs (`withSuspense`, `withKeepAlive`, etc.)
4. Add platform-specific versions if needed (`.tizen.tsx`)

### Platform-Specific Code

Use the platform utility to conditionally load platform-specific resources:

```tsx
import platform from './util/platform';

// For importing platform-specific CSS modules
const styles = platform({
  web: require('./Component.web.module.css').default,
  default: require('./Component.module.css').default
});

// For conditional rendering based on platform
const MyComponent = () => {
  const platformSpecificValue = platform({
    tizen: 'Tizen specific content',
    web: 'Web specific content',
    default: 'Default content'
  });

  return <div>{platformSpecificValue}</div>;
};
```

The platform utility uses the `__PLATFORM__` global variable set by webpack to determine the current platform and return the appropriate configuration.

### Platform-Specific Files

The template supports platform-specific file naming conventions:

#### File Naming Patterns

- **Components**: `Component.<platform>.tsx` (e.g., `DetailScreen.tizen.tsx`)
- **CSS Modules**: `Component.<platform>.module.css` (e.g., `Vertical.web.module.css`)
- **TypeScript**: `file.<platform>.ts` (e.g., `config.tizen.ts`)

#### Examples

```
src/
├── screens/
│   ├── DetailScreen.tsx      # Default implementation
│   └── DetailScreen.tizen.tsx # Tizen-specific version
├── components/
│   └── Focusable/
│       ├── Vertical.module.css     # Default styles
│       └── Vertical.web.module.css # Web-specific styles
└── util/
    ├── config.ts           # Default configuration
    └── config.tizen.ts     # Tizen-specific configuration
```

#### Loading Platform-Specific Files

```tsx
// Automatic platform resolution in imports
import DetailScreen from './screens/DetailScreen'; // Resolves to .tizen.tsx on Tizen

// Manual platform-specific CSS loading
const styles = platform({
  web: require('./Component.web.module.css').default,
  tizen: require('./Component.tizen.module.css').default,
  default: require('./Component.module.css').default
});
```

When webpack builds for a specific platform, it automatically resolves the appropriate file version based on the platform suffix.

## 🔨 Build Configuration

The project uses webpack with separate configurations:

- `webpack.config.common.ts`: Shared configuration
- `webpack.config.dev.ts`: Development-specific settings
- `webpack.config.prod.ts`: Production optimizations

## 🎨 Styling

- **CSS Modules**: Scoped component styling
- **Global Styles**: Application-wide styles in `index.css`
- **Platform Styles**: Platform-specific style overrides
- **Responsive**: Mobile-first responsive design principles

## 🚦 Error Handling

The template includes comprehensive error handling:

- **Error Boundaries**: Catch and display React errors gracefully
- **HOC Pattern**: Easy error boundary integration with `withErrorBoundary`
- **Development Tools**: Enhanced error reporting in development

## 📄 License

ISC

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 🔍 Troubleshooting

### Common Issues

1. **Navigation not working**: Ensure components are wrapped with `<Focusable>`
2. **Platform-specific issues**: Check platform detection in `util/platform.ts`
3. **Build errors**: Verify TypeScript configuration in `tsconfig.json`

### Development Tips

- Use browser developer tools for web debugging
- Check Tizen Studio for TV-specific debugging
- Monitor console for spatial navigation logs
- Use React DevTools for component inspection

---

Built with ❤️ for Smart TV development
