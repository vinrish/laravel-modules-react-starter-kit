## Laravel Modules React Starter Kit (Inertia, React & nwidart/laravel-modules)

<p>
    <a href="https://github.com/vinrish/laravel-modules-react-starter-kit/actions"><img src="https://github.com/vinrish/laravel-modules-react-starter-kit/actions/workflows/tests.yml/badge.svg" alt="Build Status"></a>
    <a href="https://packagist.org/packages/vinrish/laravel-modules-react-starter-kit"><img src="https://img.shields.io/packagist/dt/vinrish/laravel-modules-react-starter-kit" alt="Total Downloads"></a>
    <a href="https://packagist.org/packages/vinrish/laravel-modules-react-starter-kit"><img src="https://img.shields.io/packagist/v/vinrish/laravel-modules-react-starter-kit" alt="Latest Stable Version"></a>
    <a href="https://packagist.org/packages/vinrish/laravel-modules-react-starter-kit"><img src="https://img.shields.io/packagist/l/vinrish/laravel-modules-react-starter-kit" alt="License"></a>
</p>

_A rigorously engineered, type-safe Laravel starter kit built for developers who demand uncompromising code quality, architectural consistency, and long-term maintainability_

_**Laravel Modules React Starter Kit (Inertia, React & nwidart/laravel-modules)**_
combines the power of [Laravel](https://laravel.com), [Nwidart/Laravel-Modules](https://laravelmodules.com/), this opinionated starter kit provides a robust foundation for building scalable, modular, and maintainable applications without sacrificing developer experience or engineering discipline.

Designed around strict typing, immutability, explicit contracts, and fail-fast principles, it transforms best practices into enforceable standards through carefully configured tooling, consistent architectural patterns, and a development workflow built to catch problems early.

Every layer is intentionally designed to promote predictable behavior, clear separation of concerns, and confidence in every change-from backend business logic and modular domain boundaries to frontend components and application-wide type safety.

Whether you're building a complex enterprise platform or a modular SaaS application, this starter kit gives you the structure, discipline, and modern tooling needed to build software that remains reliable as it grows.

### Not just a starter kit - a foundation for engineering software with precision, confidence, and zero tolerance for avoidable technical debt.

## Why This Starter Kit?

- **Fully Actions-Oriented Architecture**: Every operation is encapsulated in a single-action class
- **Cruddy by Design**: Standardized CRUD operations for all controllers, actions, and Inertia & React pages
- **100% Type Coverage**: Every method, property, and parameter is explicitly typed
- **Zero Tolerance for Code Smells**: Rector, PHPStan, OxLint, and Oxfmt at maximum strictness catch issues before they become bugs
- **Immutable-First Architecture**: Data structures favor immutability to prevent unexpected mutations
- **Fail-Fast Philosophy**: Errors are caught at compile-time, not runtime
- **Automated Code Quality**: Pre-configured tools ensure consistent, pristine code across your entire team
- **Just Better Laravel Defaults**: Configured App Defaults / strict models, auto eager loading, immutable dates, and more...
- **Full Testing Suite**

## Getting Started

> **Requires [PHP 8.5+](https://php.net/releases/) and a code coverage driver like [xdebug](https://xdebug.org/docs/install)**.

Create your type-safe Laravel application using [Composer](https://getcomposer.org):

```bash
composer create-project vinrish/laravel-modules-react-starter-kit.git --prefer-dist example-app
```

### Initial Setup

Navigate to your project and complete the setup:

```bash
cd example-app

# Setup the project
composer setup

# Start the development server
composer dev
```

### Verify Installation

Run the test suite to ensure everything is configured correctly:

```bash
composer test
```

You should see at least 97.5% - 100% test coverage and all quality checks passing.

## Available Tooling

### Development

- `composer dev` - Starts Laravel server, queue worker, log monitoring, and Vite+ dev server concurrently

# Code Quality

- `composer lint` - Runs Rector (refactoring), Pint (PHP formatting), and Oxfmt (JS/TS formatting)
- `composer ci:check` - Dry-run mode for CI/CD pipelines

### Testing

- `composer test:type-coverage` - Ensures 100% type coverage with Pest
- `composer types:check` - Runs PHPStan at level 7
- `composer test:unit` - Runs Pest tests with 100% code coverage requirement
- `composer test` - Runs the complete test suite (type coverage, unit tests, linting, static analysis)

## License

**Laravel Modules React Starter Kit** was created by **[Vincent Kariuki](https://x.com/vinrishtechnologies)** under the **[MIT license](https://opensource.org/licenses/MIT)**.****
