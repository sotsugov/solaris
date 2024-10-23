# Solaris
The API usage dashboard - a Next.js application for visualising API usage metrics with a FastAPI backend.

## Tech Stack

### Frontend
- Next.js 14 with App Router
- TypeScript
- TailwindCSS for styling
- shadcn/ui for component library
- Recharts for data visualization
- React Query for server state management
- Next.js Server Components for improved performance

### Backend
- FastAPI framework
- Python 3.11+
- httpx for async HTTP requests
- pytest for testing

### Development Tools
- pnpm as package manager
- ESLint for code quality
- Prettier for code formatting
- TypeScript for type safety

## Getting Started

Make sure the environment has correct variables defined:
```bash
# base data url
DATA_URL=...

# backend api url for development
FAST_API_URL="http://localhost:8000/"
API_URL="http://localhost:3000/"
```

First, create and activate a virtual environment:
```bash
python3 -m venv venv
source venv/bin/activate
```

Then, install the dependencies:
```bash
pnpm install
```

Then, run the development server (python dependencies will be installed automatically here):
```bash
pnpm dev
```

Testing backend:
```bash
# Add the project root to PYTHONPATH
export PYTHONPATH=$PYTHONPATH:$(pwd)
pytest api/tests/test_credit_calculation.py
```
## Not in Scope

### Testing
- Frontend component and other types of testing
- While some of the app is accessible, the app was not optimised a18y standards

## License
This project is private and not licensed for public use.

## Future Improvements
- Add component testing with Jest and React Testing Library
- Implement CI/CD pipeline
- Add Docker support
- Implement user authentication
- Add data export functionality
