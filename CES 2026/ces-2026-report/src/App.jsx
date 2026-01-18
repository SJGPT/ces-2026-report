
import { useState, useMemo } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Pie, Bar } from 'react-chartjs-2';
import './App.css';
import reportData from './data/reportData.json';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title, ChartDataLabels);

function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeMedia, setActiveMedia] = useState(null); // To handle clicking gallery items

  // Helper to handle image paths for GitHub Pages
  const getImageUrl = (path) => {
    if (!path) return '';
    if (path.startsWith('http') || path.startsWith('data:')) return path;
    const base = import.meta.env.BASE_URL;
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    const cleanBase = base.endsWith('/') ? base : base + '/';
    return cleanBase + cleanPath;
  };

  const openProduct = (product) => {
    setSelectedProduct(product);
    setActiveMedia({ type: 'image', src: product.images[0] });
    document.body.style.overflow = 'hidden';
  };

  const closeProduct = () => {
    setSelectedProduct(null);
    setActiveMedia(null);
    document.body.style.overflow = 'auto';
  };

  const handleMediaClick = (src, type) => {
    setActiveMedia({ type, src });
  };

  // Analytics Data Calculation
  const analyticsData = useMemo(() => {
    const products = reportData.products;
    const totalProducts = products.length;

    // Country distribution (normalize USA variants)
    const countryMap = {};
    products.forEach(p => {
      let country = p.country;
      // Normalize USA variants
      if (country === 'United States' || country === 'USA' || country.includes('USA')) {
        country = 'USA';
      }
      countryMap[country] = (countryMap[country] || 0) + 1;
    });

    // Sort by count and get top countries
    const sortedCountries = Object.entries(countryMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8); // Top 8 countries

    // Type distribution by country
    const countryTypeMap = {};
    products.forEach(p => {
      let country = p.country;
      if (country === 'United States' || country === 'USA' || country.includes('USA')) {
        country = 'USA';
      }
      if (!countryTypeMap[country]) {
        countryTypeMap[country] = { type1: 0, type2: 0, type3: 0 };
      }
      countryTypeMap[country][p.typeId]++;
    });

    return {
      totalProducts,
      countryDistribution: sortedCountries,
      countryTypeMap,
      typeLabels: {
        type1: 'Humanoid',
        type2: 'Moveable',
        type3: 'Tabletop'
      }
    };
  }, []);

  return (
    <div className="app-container">
      {/* Navigation */}
      <nav className="header">
        <div className="container header-inner">
          <div className="logo">CES 2026 / PHYSICAL AI</div>
          <div className="nav-links">
            <a href="#overview">Overview</a>
            <a href="#archetypes">Archetypes</a>
            <a href="#products">Products</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="overview" className="hero">
        <div className="hero-bg-container">
          <iframe
            src='https://my.spline.design/nexbotrobotcharacterconcept-LuYAlrjFQNwcwoTVgqaJot8C/'
            frameBorder='0'
            width='100%'
            height='100%'
            className="hero-spline"
          ></iframe>
        </div>
        <div className="hero-overlay"></div>

        <div className="hero-deco-text top-left">FIGURE 01 — REPORT</div>
        <div className="hero-deco-text top-right">JAN 2026 / VOL. 1</div>
        <div className="hero-deco-text bottom-left">ANALYSIS OF<br />76 AGENTS</div>
        <div className="hero-deco-text bottom-right">LAS VEGAS,<br />NEVADA</div>

        <div className="container hero-content-layer">
          <h1 className="hero-title-top">CES 2026 PHYSICAL AI REPORT</h1>
        </div>

        <div className="scroll-indicator">
          <div className="mouse">
            <div className="wheel"></div>
          </div>
        </div>
      </section>

      {/* Insights Section */}
      <section className="container section-spacing">
        <div className="section-header">
          <span className="section-subtitle">MARKET SHIFTS</span>
          <h2 className="section-title">STRATEGIC INSIGHTS</h2>
        </div>

        <div className="insights-grid">
          {reportData.marketInsights.map((insight, idx) => (
            <div key={idx} className="insight-card">
              <div className="insight-number">0{idx + 1}</div>
              <div className="insight-content">
                <h3>{insight.title}</h3>
                <p>{insight.content}</p>
                <div className="insight-footer">{insight.highlight}</div>
              </div>
            </div>
          ))}
        </div>
      </section >

      {/* Archetypes Section */}
      < section id="archetypes" className="section-dark section-spacing" >
        <div className="container">
          <div className="section-header center">
            <span className="section-subtitle">CATEGORIZATION</span>
            <h2 className="section-title">THREE ARCHETYPES</h2>
          </div>

          <div className="archetypes-grid">
            {reportData.types.map((type) => (
              <div key={type.id} className="archetype-card">
                <div className="card-top">
                  <span className="count-badge">{type.count}</span>
                  <div className="icon-large">{type.icon}</div>
                </div>
                <h2>{type.name.split(' / ')[1]}</h2>
                <div className="divider-line"></div>
                <p>{type.description}</p>
                <div className="trend-box">
                  <span className="trend-label">KEY DRIVER</span>
                  <span className="trend-value">{type.keyInsight}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section >

      {/* Analytics Dashboard */}
      <section className="container section-spacing">
        <div className="section-header center">
          <span className="section-subtitle">DATA ANALYTICS</span>
          <h2 className="section-title">INSIGHT DASHBOARD</h2>
        </div>

        <div className="analytics-grid">
          {/* Total Product Count Card */}
          <div className="analytics-card stat-card">
            <h3 className="stat-title">Total Products Analyzed</h3>
            <div className="stat-value">{analyticsData.totalProducts}</div>
            <p className="stat-desc">across 3 major categories</p>
          </div>

          {/* Country Distribution Chart */}
          <div className="analytics-card chart-card">
            <h3 className="chart-title">Products by Country</h3>
            <div className="chart-container">
              <Pie
                data={{
                  labels: analyticsData.countryDistribution.map(([country]) => country),
                  datasets: [{
                    data: analyticsData.countryDistribution.map(([, count]) => count),
                    backgroundColor: [
                      '#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b',
                      '#10b981', '#06b6d4', '#6366f1', '#84cc16'
                    ],
                    borderWidth: 0
                  }]
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'right',
                      labels: { color: '#ffffff', font: { family: "'Outfit', sans-serif" } }
                    },
                    datalabels: {
                      color: '#ffffff',
                      font: {
                        size: 14,
                        weight: 'bold',
                        family: "'Inter', sans-serif"
                      },
                      formatter: (value) => value
                    }
                  }
                }}
              />
            </div>
          </div>

          {/* Type Distribution by Country (Stacked Bar) */}
          <div className="analytics-card chart-card wide">
            <h3 className="chart-title">Product Types by Top Countries</h3>
            <div className="chart-container">
              <Bar
                data={{
                  labels: analyticsData.countryDistribution.slice(0, 6).map(([country]) => country),
                  datasets: [
                    {
                      label: 'Humanoid',
                      data: analyticsData.countryDistribution.slice(0, 6).map(([country]) =>
                        analyticsData.countryTypeMap[country]?.type1 || 0
                      ),
                      backgroundColor: '#3b82f6',
                    },
                    {
                      label: 'Moveable',
                      data: analyticsData.countryDistribution.slice(0, 6).map(([country]) =>
                        analyticsData.countryTypeMap[country]?.type2 || 0
                      ),
                      backgroundColor: '#8b5cf6',
                    },
                    {
                      label: 'Tabletop',
                      data: analyticsData.countryDistribution.slice(0, 6).map(([country]) =>
                        analyticsData.countryTypeMap[country]?.type3 || 0
                      ),
                      backgroundColor: '#ec4899',
                    },
                  ]
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    x: {
                      stacked: true,
                      ticks: { color: '#ffffff' },
                      grid: { color: 'rgba(255,255,255,0.1)' }
                    },
                    y: {
                      stacked: true,
                      ticks: { color: '#ffffff' },
                      grid: { color: 'rgba(255,255,255,0.1)' }
                    }
                  },
                  plugins: {
                    legend: {
                      labels: { color: '#ffffff' }
                    },
                    datalabels: {
                      color: '#ffffff',
                      font: {
                        size: 11,
                        weight: 'bold',
                        family: "'Inter', sans-serif"
                      },
                      formatter: (value) => value > 0 ? value : ''
                    }
                  }
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Product Showcase */}
      {/* Product Showcase (Grouped by Type) */}
      <section id="products" className="section-spacing">
        <div className="container">
          {reportData.types.map((type) => {
            const typeProducts = reportData.products.filter(p => p.typeId === type.id);
            if (typeProducts.length === 0) return null;

            return (
              <div key={type.id} className="type-section">
                <div className="type-header-modern">
                  <h2 className="type-title-large">{type.name.split(' / ')[1]}</h2>
                  <div className="type-meta">
                    <span className="type-id">{type.id.toUpperCase()}</span>
                    <p>{type.description}</p>
                  </div>
                </div>

                <div className="products-grid-modern">
                  {typeProducts.map((product) => (
                    <div
                      key={product.id}
                      className="product-card-modern"
                      onClick={() => openProduct(product)}
                    >
                      <div className="product-image-wrap">
                        <img
                          src={getImageUrl(product.images[0])}
                          alt={product.name}
                          className="product-col-img"
                        />
                        <div className="product-overlay">
                          <span>VIEW ANALYSIS</span>
                        </div>
                      </div>
                      <div className="product-row-info">
                        <span className="brand-label">{product.manufacturer}</span>
                        <h3>{product.name}</h3>
                        <span className="country-label">{product.country}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Enhanced Product Modal */}
      {
        selectedProduct && (
          <div className="modal-overlay" onClick={closeProduct}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="close-button" onClick={closeProduct}>&times;</button>

              {/* Visual Column */}
              <div className="modal-media">
                <div className="media-viewer">
                  <img src={getImageUrl(activeMedia?.src)} alt="Main View" />
                </div>

                <div className="media-gallery">
                  {/* Image Thumbnails */}
                  {selectedProduct.images.map((img, i) => (
                    <img
                      key={i}
                      src={getImageUrl(img)}
                      alt={`Gallery ${i}`}
                      onClick={() => handleMediaClick(img, 'image')}
                      style={{ borderColor: activeMedia?.src === img ? '#3b82f6' : 'transparent' }}
                    />
                  ))}
                </div>
              </div>

              {/* Content Column */}
              <div className="modal-info">
                <span className="brand-badge">{selectedProduct.manufacturer}</span>
                <h2>{selectedProduct.name}</h2>
                <p className="product-overview">{selectedProduct.overview}</p>

                <div className="analysis-section">
                  <h3>{selectedProduct.analysis.intro}</h3>
                  {selectedProduct.analysis.points.map((pt, idx) => (
                    <div key={idx} className="analysis-point">
                      <h4>{pt.title}</h4>
                      <p>{pt.content}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )
      }
    </div >
  );
}

export default App;
