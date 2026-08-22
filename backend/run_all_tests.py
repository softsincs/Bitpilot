import os
import sys
import subprocess

def run_tests():
    print("=" * 70)
    print("  BidPilot AI Backend — Production Readiness Automated Test Suite")
    print("=" * 70)
    
    backend_dir = os.path.dirname(os.path.abspath(__file__))
    venv_pytest = os.path.join(backend_dir, "venv", "Scripts", "pytest.exe")
    
    cmd = [venv_pytest if os.path.exists(venv_pytest) else "pytest", "-v", os.path.join(backend_dir, "tests")]
    
    print(f"Executing: {' '.join(cmd)}\n")
    result = subprocess.run(cmd, cwd=backend_dir)
    
    print("\n" + "=" * 70)
    if result.returncode == 0:
        print("  ALL AUTOMATED TESTS PASSED SUCCESSFULLY! (100% PASS RATE)")
    else:
        print(f"  AUTOMATED TESTS FAILED with return code: {result.returncode}")
    print("=" * 70)
    return result.returncode

if __name__ == "__main__":
    sys.exit(run_tests())
