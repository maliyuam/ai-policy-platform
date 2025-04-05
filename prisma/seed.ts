// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clean existing data (be careful with this in production)
  await prisma.comment.deleteMany();
  await prisma.consultation.deleteMany();
  await prisma.categoryRelation.deleteMany();
  await prisma.category.deleteMany();
  await prisma.legislation.deleteMany();
  await prisma.timelineEvent.deleteMany();
  await prisma.contributingFactor.deleteMany();
  await prisma.incident.deleteMany();
  await prisma.user.deleteMany();

  console.log('Database cleaned');

  // Create Categories
  const categories = await Promise.all([
    prisma.category.create({ data: { name: 'Data Privacy' } }),
    prisma.category.create({ data: { name: 'Algorithmic Bias' } }),
    prisma.category.create({ data: { name: 'Facial Recognition' } }),
    prisma.category.create({ data: { name: 'Autonomous Systems' } }),
    prisma.category.create({ data: { name: 'Healthcare AI' } }),
  ]);

  console.log('Categories created');

  // Create Incidents
  const incidents = await Promise.all([
    prisma.incident.create({
      data: {
        title: 'Biased Facial Recognition Deployment in Nairobi',
        description: 'A facial recognition system deployed in Nairobi showed significant bias against darker-skinned individuals, leading to multiple cases of misidentification.',
        date: new Date('2024-08-15'),
        region: 'East Africa',
        country: 'Kenya',
        severity: 'High',
        aiSystemType: 'Facial Recognition',
        status: 'Resolved',
        impactDescription: 'The system misidentified over 200 individuals, leading to wrongful detentions.',
        sourceUrl: 'https://example.com/incident1',
        contributingFactors: {
          create: [
            {
              name: 'Training Data Bias',
              description: 'The system was primarily trained on lighter-skinned faces.'
            },
            {
              name: 'Inadequate Testing',
              description: 'The system was not adequately tested in local conditions before deployment.'
            }
          ]
        },
        timeline: {
          create: [
            {
              date: new Date('2024-08-15'),
              description: 'System deployed at major transportation hubs'
            },
            {
              date: new Date('2024-08-20'),
              description: 'First reports of misidentification emerge'
            },
            {
              date: new Date('2024-09-05'),
              description: 'System taken offline for review'
            },
            {
              date: new Date('2024-10-10'),
              description: 'Updated system with improved training data deployed'
            }
          ]
        }
      }
    }),
    prisma.incident.create({
      data: {
        title: 'AI Credit Scoring Discrimination in Lagos',
        description: 'An AI-powered credit scoring system showed bias against female entrepreneurs, leading to systematically lower credit scores.',
        date: new Date('2024-06-22'),
        region: 'West Africa',
        country: 'Nigeria',
        severity: 'High',
        aiSystemType: 'Financial Services AI',
        status: 'Under Investigation',
        impactDescription: 'Estimated hundreds of women entrepreneurs received unfairly low credit scores.',
        sourceUrl: 'https://example.com/incident2',
        contributingFactors: {
          create: [
            {
              name: 'Historical Data Bias',
              description: 'The system trained on historically biased lending data.'
            },
            {
              name: 'Proxy Variables',
              description: 'The system used proxy variables that correlated with gender.'
            }
          ]
        },
        timeline: {
          create: [
            {
              date: new Date('2024-06-22'),
              description: 'Civil society organization identifies pattern of discrimination'
            },
            {
              date: new Date('2024-07-10'),
              description: 'Investigation launched by financial regulatory authority'
            },
            {
              date: new Date('2024-07-25'),
              description: 'Preliminary findings confirm bias in algorithm'
            }
          ]
        }
      }
    }),
    prisma.incident.create({
      data: {
        title: 'Healthcare AI Diagnostic Errors in Rural South Africa',
        description: 'An AI diagnostic tool for tuberculosis showed significantly higher error rates in rural healthcare centers.',
        date: new Date('2024-05-03'),
        region: 'Southern Africa',
        country: 'South Africa',
        severity: 'Critical',
        aiSystemType: 'Healthcare Diagnostic AI',
        status: 'Resolved',
        impactDescription: 'Estimated 150 misdiagnoses over a three-month period.',
        sourceUrl: 'https://example.com/incident3',
        contributingFactors: {
          create: [
            {
              name: 'Infrastructure Differences',
              description: 'The system was not calibrated for equipment in rural settings.'
            },
            {
              name: 'Connectivity Issues',
              description: 'Intermittent connectivity led to model processing errors.'
            }
          ]
        },
        timeline: {
          create: [
            {
              date: new Date('2024-05-03'),
              description: 'Clinicians report unusual pattern of diagnostic errors'
            },
            {
              date: new Date('2024-05-15'),
              description: 'System audit initiated'
            },
            {
              date: new Date('2024-06-10'),
              description: 'Revised system with offline capabilities deployed'
            }
          ]
        }
      }
    })
  ]);

  console.log('Incidents created');

  // Create Legislation
  const legislation = await Promise.all([
    prisma.legislation.create({
      data: {
        title: 'Data Protection and AI Governance Act',
        type: 'Law',
        status: 'Enacted',
        jurisdiction: 'Rwanda',
        region: 'East Africa',
        description: 'Comprehensive legislation covering data protection principles and AI governance framework.',
        content: 'The Act establishes principles for responsible AI development including fairness, transparency, and accountability...',
        dateProposed: new Date('2023-09-15'),
        dateEnacted: new Date('2024-03-22'),
        sourceUrl: 'https://example.com/legislation1',
        categories: {
          create: [
            { categoryId: categories[0].id },
            { categoryId: categories[1].id }
          ]
        }
      }
    }),
    prisma.legislation.create({
      data: {
        title: 'Ethical AI Framework',
        type: 'Framework',
        status: 'Enacted',
        jurisdiction: 'Nigeria',
        region: 'West Africa',
        description: 'Non-binding framework establishing principles for ethical AI development and deployment.',
        content: 'This framework outlines principles including human oversight, technical robustness, privacy and data governance...',
        dateProposed: new Date('2023-11-10'),
        dateEnacted: new Date('2024-02-15'),
        sourceUrl: 'https://example.com/legislation2',
        categories: {
          create: [
            { categoryId: categories[1].id }
          ]
        }
      }
    }),
    prisma.legislation.create({
      data: {
        title: 'AI in Healthcare Regulation',
        type: 'Regulation',
        status: 'Proposed',
        jurisdiction: 'South Africa',
        region: 'Southern Africa',
        description: 'Specific regulations for AI systems used in healthcare settings.',
        content: 'These regulations establish standards for validation, monitoring, and performance assessment of AI systems in healthcare...',
        dateProposed: new Date('2024-01-20'),
        sourceUrl: 'https://example.com/legislation3',
        categories: {
          create: [
            { categoryId: categories[4].id }
          ]
        }
      }
    }),
    prisma.legislation.create({
      data: {
        title: 'Facial Recognition Moratorium Bill',
        type: 'Bill',
        status: 'Proposed',
        jurisdiction: 'Kenya',
        region: 'East Africa',
        description: 'Proposed temporary ban on facial recognition technology in public spaces.',
        content: 'This bill would establish a three-year moratorium on the use of facial recognition in public spaces while regulatory frameworks are developed...',
        dateProposed: new Date('2024-02-05'),
        sourceUrl: 'https://example.com/legislation4',
        categories: {
          create: [
            { categoryId: categories[2].id }
          ]
        }
      }
    }),
    prisma.legislation.create({
      data: {
        title: 'Autonomous Vehicles Testing Act',
        type: 'Law',
        status: 'Enacted',
        jurisdiction: 'Ghana',
        region: 'West Africa',
        description: 'Framework for testing and eventual deployment of autonomous vehicles.',
        content: 'This law establishes testing zones, safety requirements, and liability frameworks for autonomous vehicle testing...',
        dateProposed: new Date('2023-07-12'),
        dateEnacted: new Date('2024-01-10'),
        sourceUrl: 'https://example.com/legislation5',
        categories: {
          create: [
            { categoryId: categories[3].id }
          ]
        }
      }
    })
  ]);

  console.log('Legislation created');

  // Create Consultations
  const consultations = await Promise.all([
    prisma.consultation.create({
      data: {
        title: 'Public Consultation on AI in Financial Services',
        description: 'Seeking public input on the use of AI for credit scoring, fraud detection, and financial inclusion.',
        status: 'Open',
        startDate: new Date('2024-03-15'),
        endDate: new Date('2024-05-15'),
        domain: 'Financial Services',
        region: 'West Africa',
        legislationId: null,
        comments: {
          create: [
            {
              content: 'Critical consideration should be given to existing patterns of financial exclusion which may be amplified by AI systems.',
              authorName: 'Dr. Amina Diallo',
              authorType: 'Academic',
              authorVerified: true,
            },
            {
              content: 'Small businesses need assurance that AI systems will not unfairly disadvantage them compared to larger entities with more extensive digital footprints.',
              authorName: 'Ibrahim Mensah',
              authorType: 'Industry',
              authorVerified: true,
            }
          ]
        }
      }
    }),
    prisma.consultation.create({
      data: {
        title: 'Draft Facial Recognition Guidelines',
        description: 'Public comments sought on proposed guidelines for facial recognition technology used by private entities.',
        status: 'Open',
        startDate: new Date('2024-04-01'),
        endDate: new Date('2024-06-01'),
        domain: 'Facial Recognition',
        region: 'East Africa',
        legislationId: legislation[3].id,
        comments: {
          create: [
            {
              content: 'The draft guidelines should explicitly address potential bias in facial recognition systems and mandate regular auditing.',
              authorName: 'Ngozi Okafor',
              authorType: 'Civil Society',
              authorVerified: true,
            },
            {
              content: 'As a technology provider, we believe these guidelines should balance innovation with ethical considerations. We suggest specific performance thresholds for different use cases.',
              authorName: 'Tech Solutions Africa',
              authorType: 'Industry',
              authorVerified: true,
            }
          ]
        }
      }
    }),
    prisma.consultation.create({
      data: {
        title: 'AI Ethics in Healthcare',
        description: 'Consultation on ethical principles for AI applications in healthcare settings.',
        status: 'Closed',
        startDate: new Date('2023-12-01'),
        endDate: new Date('2024-02-01'),
        domain: 'Healthcare',
        region: 'Southern Africa',
        legislationId: legislation[2].id,
        comments: {
          create: [
            {
              content: 'Any framework must center patient autonomy and ensure medical professionals maintain ultimate decision-making authority.',
              authorName: 'Southern African Medical Association',
              authorType: 'Industry',
              authorVerified: true,
            },
            {
              content: 'Rural healthcare facilities must be specifically considered in these guidelines, as they face unique challenges in AI implementation.',
              authorName: 'Rural Health Access Coalition',
              authorType: 'Civil Society',
              authorVerified: true,
            }
          ]
        }
      }
    })
  ]);

  console.log('Consultations created');

  // Create Users
  await prisma.user.createMany({
    data: [
      {
        name: 'Admin User',
        email: 'admin@aipolicyplatform.org',
        role: 'Admin'
      },
      {
        name: 'Editor User',
        email: 'editor@aipolicyplatform.org',
        role: 'Editor'
      },
      {
        name: 'Viewer User',
        email: 'viewer@aipolicyplatform.org',
        role: 'Viewer'
      }
    ]
  });

  console.log('Users created');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });