import { Link } from 'react-router-dom';

export default function Privacy() {
    return (
        <div className="max-w-2xl mx-auto px-6 py-12">
            <h1 className="text-xl font-bold text-primary mb-2">Privacy Policy</h1>
            <p className="text-xs text-text-muted mb-6">Last updated: May 29, 2026</p>

            <div className="space-y-5 text-sm text-text-secondary leading-relaxed">
                <p>
                    PromiseLane ("we", "our", or "us") is a project governance platform for freelancers. 
                    This policy explains what data we collect, how we use it, and your rights.
                </p>

                <div>
                    <h3 className="font-semibold text-text mb-1">1. Data You Provide</h3>
                    <p>When you create an account, we collect your <strong>name and email address</strong>. As you use PromiseLane, you may enter:</p>
                    <ul className="list-disc ml-5 mt-2 space-y-1">
                        <li>Project details (title, client name, client email, description, budget)</li>
                        <li>Milestones (title, amount, due dates, status)</li>
                        <li>Requirements (client requests, scope decisions)</li>
                        <li>Payment records (amount, method, references)</li>
                        <li>Files uploaded as deliverables</li>
                        <li>Feedback and bug reports you submit</li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-semibold text-text mb-1">2. How We Use Your Data</h3>
                    <p>Your data is used exclusively to provide the PromiseLane service. Specifically:</p>
                    <ul className="list-disc ml-5 mt-2 space-y-1">
                        <li>Authenticating your account and keeping it secure</li>
                        <li>Displaying your projects, milestones, and activity timeline</li>
                        <li>Generating shareable client views when you choose to share a project</li>
                        <li>Storing your preferences and settings</li>
                        <li>Receiving and reviewing your feedback</li>
                    </ul>
                    <p className="mt-2">We <strong>do not</strong> sell, rent, share, or monetize your data in any way.</p>
                </div>

                <div>
                    <h3 className="font-semibold text-text mb-1">3. Client Data & Sharing</h3>
                    <p>
                        When you generate a share link for a project, the recipient can view the project summary, 
                        milestones, and requirements you've linked to that project. 
                        <strong>You control what is shared.</strong> Share links can be revoked at any time, 
                        immediately revoking access.
                    </p>
                    <p className="mt-2">
                        Client names and emails you enter are stored for your reference and are not used to contact 
                        your clients. We never reach out to your clients on your behalf.
                    </p>
                </div>

                <div>
                    <h3 className="font-semibold text-text mb-1">4. Data Security</h3>
                    <p>We protect your data with:</p>
                    <ul className="list-disc ml-5 mt-2 space-y-1">
                        <li>JWT-based stateless authentication — no sessions, no cookies</li>
                        <li>Passwords hashed using industry-standard bcrypt encryption</li>
                        <li>Database access restricted to the application server</li>
                        <li>Per-user data isolation — you can only see your own projects</li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-semibold text-text mb-1">5. Data Retention & Deletion</h3>
                    <p>
                        Your data is retained as long as your account is active. You can delete projects, milestones, 
                        requirements, payments, and deliverables at any time from within the app. 
                        To request complete account deletion and removal of all associated data, use the 
                        <strong> Feedback page</strong> or contact the developer.
                    </p>
                </div>

                <div>
                    <h3 className="font-semibold text-text mb-1">6. Cookies & Tracking</h3>
                    <p>
                        PromiseLane uses <strong>no cookies</strong> for authentication. Your JWT token is stored 
                        in your browser's localStorage. We do not use any third-party analytics, tracking scripts, 
                        or advertising cookies.
                    </p>
                </div>

                <div>
                    <h3 className="font-semibold text-text mb-1">7. Your Rights</h3>
                    <ul className="list-disc ml-5 mt-2 space-y-1">
                        <li><strong>Access:</strong> View all your data from within the app at any time</li>
                        <li><strong>Update:</strong> Edit your profile, projects, and settings</li>
                        <li><strong>Delete:</strong> Remove any project, milestone, or your entire account</li>
                        <li><strong>Portability:</strong> Request an export of your data</li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-semibold text-text mb-1">8. Changes To This Policy</h3>
                    <p>
                        If this policy changes, we will update this page and note the date of change. 
                        For significant changes, we may notify you through the platform.
                    </p>
                </div>

                <div>
                    <h3 className="font-semibold text-text mb-1">9. Contact & Reporting</h3>
                    <p>
                        To report a bug, request a feature, ask a privacy question, or request data deletion, 
                        use the <strong>Feedback</strong> option in the sidebar or visit the 
                        <Link to="/feedback" className="text-accent hover:underline"> Feedback page</Link>.
                    </p>
                </div>
            </div>

            <Link to="/" className="inline-block mt-8 text-accent text-sm hover:underline">← Back to Home</Link>
        </div>
    );
}