import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Uncaught error:", error, errorInfo);
        this.setState({ error, errorInfo });
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-6">
                    <div className="max-w-xl p-8 bg-gray-800 rounded-lg shadow-xl border border-red-500">
                        <h1 className="text-2xl font-bold text-red-500 mb-4">Algo deu errado.</h1>
                        <p className="mb-4 text-gray-300">Ocorreu um erro ao carregar a aplicação.</p>
                        <details className="whitespace-pre-wrap font-mono text-sm bg-gray-950 p-4 rounded overflow-auto max-h-60">
                            {this.state.error && this.state.error.toString()}
                            <br />
                            {this.state.errorInfo && this.state.errorInfo.componentStack}
                        </details>
                        <button
                            onClick={() => window.location.reload()}
                            className="mt-6 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded transition-colors"
                        >
                            Recarregar Página
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
