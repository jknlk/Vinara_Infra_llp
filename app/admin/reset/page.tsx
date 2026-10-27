import ResetPasswordForm from "@/components/admin/ResetPasswordForm";

export const dynamic = "force-dynamic";

export default async function AdminResetPage({ searchParams }: { searchParams: Promise<{ token?: string }> }) {
  const { token } = await searchParams;
  return (
    <div className="grid min-h-full place-items-center px-6 py-12">
      <ResetPasswordForm token={typeof token === "string" ? token : ""} />
    </div>
  );
}
