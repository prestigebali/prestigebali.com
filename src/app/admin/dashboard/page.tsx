'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUser } from "@/firebase";

export default function DashboardPage() {
    const { user } = useUser();

    return (
        <main className="flex-1 p-8">
            <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Welcome, Admin!</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>You are logged in as: {user?.email}</p>
                    <p className="mt-4 text-muted-foreground">
                        This is your main dashboard. You can manage website content from here.
                        Use the sidebar to navigate between different management sections.
                    </p>
                </CardContent>
            </Card>
        </main>
    );
}
