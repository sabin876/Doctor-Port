/**
 * Utility to translate a dynamic Service object using the Translation system.
 * Handles fallbacks gracefully to the static translation files when backend overrides don't exist.
 */
export const getTranslatedService = (service, t, language) => {
    if (!service) return null;
    
    // Index mapping of service slugs in the translations services.items array
    const slugIndexMap = {
        'joint-replacement': 0,
        'sports-medicine': 1,
        'robotic-surgery': 2,
        'arthroscopy': 3,
        'deformity-correction': 4,
        'consultation': 5,
        'orthopedic-trauma': 6,
        'physiotherapy': 7
    };
    
    const index = slugIndexMap[service.slug];
    
    // 1. Title Translation
    let title = t(`service_title_${service.slug}`);
    if (title === `service_title_${service.slug}`) {
        // Fall back to static translations items array if index matches
        if (index !== undefined) {
            title = t(`services.items.${index}.title`);
        } else {
            title = service.title;
        }
    }
    
    // 2. Description Translation
    let description = t(`service_desc_${service.slug}`);
    if (description === `service_desc_${service.slug}`) {
        description = t(`service_description_${service.slug}`);
    }
    if (description === `service_description_${service.slug}`) {
        if (index !== undefined) {
            description = t(`services.items.${index}.desc`);
        } else {
            description = service.description;
        }
    }
    
    // 3. Features (items) Translation
    let items = t(`service_features_${service.slug}`);
    if (typeof items === 'string' && items.startsWith('service_features_')) {
        items = service.items && service.items.length > 0 ? service.items : null;
    }
    
    // 4. FAQs Translation
    let faqs = t(`service_faqs_${service.slug}`);
    if (typeof faqs === 'string' && faqs.startsWith('service_faqs_')) {
        faqs = service.faqs && service.faqs.length > 0 ? service.faqs : null;
    }
    
    return {
        ...service,
        title,
        description,
        items: items || service.items,
        faqs: faqs || service.faqs
    };
};
