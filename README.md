## Getting Started

First, create and activate a virtual environment:

```bash
python3 -m venv venv
source venv/bin/activate
```

Then, install the dependencies:

```bash
pnpm install
```

Then, run the development server(python dependencies will be installed automatically here):

```bash
pnpm dev
```

Testing backend

```bash
# Add the project root to PYTHONPATH
export PYTHONPATH=$PYTHONPATH:$(pwd)

pytest api/tests/test_credit_calculation.py
```
