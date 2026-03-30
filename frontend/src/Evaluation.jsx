import { useState } from 'react';
import './Evaluation.css';

const Evaluation = () => {
    const [formData, setFormData] = useState({
        deviceType: '',
        brand: '',
        model: '',
        condition: '',
        storage: '',
        age: '',
        accessories: [],
    });
    const [evaluation, setEvaluation] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleAccessoryChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setFormData({
                ...formData,
                accessories: [...formData.accessories, value],
            });
        } else {
            setFormData({
                ...formData,
                accessories: formData.accessories.filter((item) => item !== value),
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Implement actual evaluation logic
        const estimatedValue = Math.floor(Math.random() * 500000) + 50000;
        setEvaluation({
            value: estimatedValue,
            condition: formData.condition,
            recommendations: [
                'Device is in good condition',
                'Market demand is high for this model',
                'Consider trading up for latest version',
            ],
        });
    };

    return (
        <div className="evaluation-page">
            <div className="evaluation-container">
                
                <h1>Device Evaluation</h1>
                <p className="evaluation-subtitle">
                    Get an instant estimate of your device's value
                </p>

                <div className="evaluation-content">
                    <form onSubmit={handleSubmit} className="evaluation-form">
                        <div className="form-group">
                            <label htmlFor="deviceType">Device Type</label>
                            <select
                                id="deviceType"
                                name="deviceType"
                                value={formData.deviceType}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select device type</option>
                                <option value="smartphone">Smartphone</option>
                                <option value="tablet">Tablet</option>
                                <option value="laptop">Laptop</option>
                                <option value="smartwatch">Smartwatch</option>
                                <option value="headphones">Headphones</option>
                            </select>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="brand">Brand</label>
                                <input
                                    type="text"
                                    id="brand"
                                    name="brand"
                                    value={formData.brand}
                                    onChange={handleChange}
                                    placeholder="e.g., Apple, Samsung"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="model">Model</label>
                                <input
                                    type="text"
                                    id="model"
                                    name="model"
                                    value={formData.model}
                                    onChange={handleChange}
                                    placeholder="e.g., iPhone 13 Pro"
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="condition">Condition</label>
                            <select
                                id="condition"
                                name="condition"
                                value={formData.condition}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select condition</option>
                                <option value="excellent">Excellent - Like new</option>
                                <option value="good">Good - Minor wear</option>
                                <option value="fair">Fair - Visible wear</option>
                                <option value="poor">Poor - Significant damage</option>
                            </select>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="storage">Storage Capacity</label>
                                <input
                                    type="text"
                                    id="storage"
                                    name="storage"
                                    value={formData.storage}
                                    onChange={handleChange}
                                    placeholder="e.g., 128GB, 256GB"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="age">Age (years)</label>
                                <input
                                    type="number"
                                    id="age"
                                    name="age"
                                    value={formData.age}
                                    onChange={handleChange}
                                    min="0"
                                    max="10"
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Accessories Included</label>
                            <div className="checkbox-group">
                                <label className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        value="box"
                                        onChange={handleAccessoryChange}
                                    />
                                    <span>Original Box</span>
                                </label>
                                <label className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        value="charger"
                                        onChange={handleAccessoryChange}
                                    />
                                    <span>Charger</span>
                                </label>
                                <label className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        value="cable"
                                        onChange={handleAccessoryChange}
                                    />
                                    <span>Cable</span>
                                </label>
                                <label className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        value="earphones"
                                        onChange={handleAccessoryChange}
                                    />
                                    <span>Earphones</span>
                                </label>
                            </div>
                        </div>

                        <button type="submit" className="btn-evaluate">
                            Get Evaluation
                        </button>
                    </form>

                    {evaluation && (
                        <div className="evaluation-result">
                            <h2>Evaluation Result</h2>
                            <div className="value-display">
                                <span className="value-label">Estimated Value:</span>
                                <span className="value-amount">₦{evaluation.value.toLocaleString()}</span>
                            </div>
                            <div className="recommendations">
                                <h3>Recommendations</h3>
                                <ul>
                                    {evaluation.recommendations.map((rec, index) => (
                                        <li key={index}>{rec}</li>
                                    ))}
                                </ul>
                            </div>
                            <button className="btn-proceed">Proceed to Swap</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Evaluation;