"use client";

import { useFormState, useFormStatus } from 'react-dom';
import { FaGoogle } from "react-icons/fa";
import Link from "next/link";
import { IoInformationOutline } from 'react-icons/io5';
import clsx from 'clsx';
import { useEffect } from 'react';
import { signIn } from 'next-auth/react';
import { authenticate } from '@/actions/auth/login';


// import { useRouter } from 'next/navigation';

export const LoginForm = () => {
  const [state, dispatch] = useFormState(authenticate, undefined);

  useEffect(() => {
    if (state === "Success") {
      window.location.replace("/");
    }
  }, [state]);

  const handleGoogleLogin = async () => {
    // Llamar a la función signIn para Google
    await signIn("google", { redirect: true });
  };

  return (
    <div className="md:w-1/2 bg-white flex flex-col justify-center p-8">
      <div className="max-w-md w-full mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-center">Iniciar Sesión</h1>
        <form action={dispatch} className="space-y-4">
          <div>
            <label htmlFor="email" className="block font-bold">
              Correo Electrónico
            </label>
            <input
              type="email"
              name="email"
              className="w-full border rounded-lg p-2 mt-2 focus:outline-none focus:ring-2 focus:ring-red-600"
              placeholder="Ingresa tu correo"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block font-bold">
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              className="w-full border rounded-lg p-2 mt-2 focus:outline-none focus:ring-2 focus:ring-red-600"
              placeholder="Ingresa tu contraseña"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span>Recuérdame</span>
            </label>
            <Link href="/forgot-password" className="text-red-600 hover:underline">
              Olvidé mi contraseña
            </Link>
          </div>

          <div
            className='flex h-8 items-end space-x-1'
            aria-live='polite'
            aria-atomic="true">
            {state === "CredentialsSignin" && (
              <div className="flex flex-row mb-2">
                <IoInformationOutline className="h-5 w-5 text-red-500" />
                <p className='text-sm text-red-500'>La información no es correcta</p>
              </div>
            )}
          </div>

          <LoginButton />
        </form>
        <div className="flex items-center justify-between mt-6">
          <div className="border-t w-full border-gray-300"></div>
          <span className="mx-4">o</span>
          <div className="border-t w-full border-gray-300"></div>
        </div>
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center bg-blue-600 text-white py-2 rounded-lg mt-4 hover:bg-blue-700 transition"
        >
          <FaGoogle className="mr-2" />
          Iniciar con Google
        </button>
        <div className="text-center mt-4">
          <span>¿No tienes cuenta?</span>
          <Link href="/auth/new-account" className="text-red-600 hover:underline ml-1">
            Regístrate
          </Link>
        </div>
      </div>
    </div>
  );
};

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={clsx(
        "w-full py-2 rounded-lg transition",
        pending ? "bg-gray-400 text-gray-200 cursor-not-allowed" : "bg-red-600 text-white hover:bg-red-700"
      )}
    >
      {pending ? "Cargando..." : "Iniciar Sesión"}
    </button>
  );
}

